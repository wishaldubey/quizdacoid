import { openDB } from "idb";
import type { QuizAttempt } from "../types";

const dbName = "quizDB"; // Name of the IndexedDB database
const storeName = "attempts"; // Name of the object store

// Function to initialize the IndexedDB database
export async function initDB() {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      // This function is called when the database is created or upgraded
      db.createObjectStore(storeName, { keyPath: "id" }); // Creates an object store with 'id' as the key
    },
  });
  return db;
}

// Function to save a quiz attempt to the database
export async function saveAttempt(attempt: QuizAttempt) {
  const db = await initDB(); // Initialize the database
  await db.add(storeName, attempt); // Add the attempt to the object store
}

// Function to retrieve all quiz attempts from the database
export async function getAttempts(): Promise<QuizAttempt[]> {
  const db = await initDB(); // Initialize the database
  return db.getAll(storeName); // Get all records from the object store
}

// Function to retrieve a specific quiz attempt by its ID
export async function getAttemptById(
  id: string
): Promise<QuizAttempt | undefined> {
  const db = await initDB(); // Initialize the database
  return db.get(storeName, id); // Get a record from the object store by its key (ID)
}
