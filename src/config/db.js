import { PrismaClient} from "@prisma/client/extension";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query" ,"error" , "warn"] : ["error"],
});

const connectDB = async () => {
    try {
await prisma.$connect()
console.log("DB COnnected via Prisma");        
    } catch(error){
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

const dicconnectDB = async () => {
    await prisma.$disconnect();
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});