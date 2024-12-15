-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "occurrence" INTEGER NOT NULL DEFAULT 1,
    "brainstormId" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_brainstormId_fkey" FOREIGN KEY ("brainstormId") REFERENCES "Brainstorm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
