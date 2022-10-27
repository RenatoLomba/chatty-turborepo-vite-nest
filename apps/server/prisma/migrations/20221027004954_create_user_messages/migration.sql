-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SenderMessage" (
    "id" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "SenderMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceiverMessage" (
    "id" TEXT NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "ReceiverMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "SenderMessage" ADD CONSTRAINT "SenderMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiverMessage" ADD CONSTRAINT "ReceiverMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
