/*
  Warnings:

  - Made the column `companyName` on table `CoverLetter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jobTitle` on table `CoverLetter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Resume_id_key";

-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "jobTitle" SET NOT NULL;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "atsScore" DOUBLE PRECISION,
ADD COLUMN     "feedback" TEXT;

-- CreateIndex
CREATE INDEX "CoverLetter_userId_idx" ON "CoverLetter"("userId");
