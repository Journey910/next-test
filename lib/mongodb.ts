import { MongoClient } from "mongodb";

const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경변수가 없습니다.");
  }
  const client = new MongoClient(uri, options);
  return client.connect();
}

let prodClientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise();
    }
    return global._mongoClientPromise;
  }
  if (!prodClientPromise) {
    prodClientPromise = createClientPromise();
  }
  return prodClientPromise;
}

/** Resolves only when first awaited — avoids throwing or connecting during `next build` */
const clientPromise: Promise<MongoClient> = {
  then(onFulfilled, onRejected) {
    return getClientPromise().then(onFulfilled, onRejected);
  },
  catch(onRejected) {
    return getClientPromise().catch(onRejected);
  },
  finally(onFinally) {
    return getClientPromise().finally(onFinally);
  },
  [Symbol.toStringTag]: "Promise",
} as Promise<MongoClient>;

export default clientPromise;
