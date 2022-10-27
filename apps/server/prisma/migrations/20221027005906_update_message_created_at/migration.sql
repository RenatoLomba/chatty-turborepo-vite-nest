/*
  Warnings:

  - Added the required column `messageId` to the `ReceiverMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `SenderMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ReceiverMessage" ADD COLUMN     "messageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SenderMessage" ADD COLUMN     "messageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SenderMessage" ADD CONSTRAINT "SenderMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiverMessage" ADD CONSTRAINT "ReceiverMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
