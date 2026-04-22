-- AlterTable
ALTER TABLE "User" ADD COLUMN     "faceDiscriptor" JSONB,
ADD COLUMN     "monthlyBalance" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
