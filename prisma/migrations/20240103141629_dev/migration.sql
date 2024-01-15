-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "role" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
