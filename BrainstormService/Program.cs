using System.Security.Cryptography;
using System.Text;
using BrainstormService.External;
using BrainstormService.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Filters;
using BrainstormService.Hubs;
using BrainstormService.Services.AIService;
using BrainstormService.Services.BrainstormServices;

static async Task<RsaSecurityKey> GetPublicRsaSecurityKey(WebApplicationBuilder builder) {
    // Fetch the public key from your Auth Service
    var httpClient = new HttpClient();
    var publicKeyUrl = builder.Configuration.GetSection("AppSettings:AuthServerURL");
    var publicKeyResponse = await httpClient.GetAsync($"{publicKeyUrl.Value}/auth/public-key");
    var publicKeyResponseString = await publicKeyResponse.Content.ReadAsStringAsync();

    // Extract JSON Information
    PublicKeyResponse? publicKeyObj = JsonConvert.DeserializeObject<PublicKeyResponse>(publicKeyResponseString);
    if (publicKeyObj == null) throw new Exception("Not a valid Response");

    var publicKey = publicKeyObj.publicKey;

    // Create an RSA object from the public key PEM
    var rsa = RSA.Create();
    rsa.ImportFromPem(publicKey.AsSpan());

    // Create an RsaSecurityKey from the RSA object
    return new RsaSecurityKey(rsa);
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

// Add services to the container.
builder.Services.AddTransient<IBrainstormsService, BrainstormsService>();
builder.Services.AddTransient<IAIService, AIService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddDbContext<RailwayContext>();

var publicRsaSecurityKey = await GetPublicRsaSecurityKey(builder);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = publicRsaSecurityKey,
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

string clientUrl = builder.Configuration.GetSection("AppSettings:ClientURL").Value!;
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder => {
    builder
    .WithOrigins(clientUrl)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHub<BrainstormHub>("/brainstormHub");

app.Run();
