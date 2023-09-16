import { firestore, auth, installations } from 'firebase-admin';

import { ApplicationError } from 'src/https/middleware/error-handler';

const db = firestore();
export const projectId =
  process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT || installations().app.options.projectId || '';

export const docExists = async (path: string) => {
  const snapshot = await getDocumentRef(path).get();
  return snapshot.exists;
};

export const getDocuments = async <T extends {}>(
  collection: string,
  filters: [firestore.FieldPath | string, FirebaseFirestore.WhereFilterOp, unknown][] = [],
) => {
  let collectionRef: firestore.CollectionReference | firestore.Query = db.collection(collection);
  filters.map((f) => {
    const [fieldPath, opStr, value] = f;
    collectionRef = collectionRef.where(fieldPath as string, opStr, value);
  });
  return (await collectionRef.get()).docs.map((entity) =>
    Object.assign(entity.data() as T, {
      id: entity.id,
    })
  );
};

export const getDocument = async <T extends {}>( path: string) => {
  const snapshot = await db.doc(path).get();
  if (snapshot.exists) {
    return Object.assign(snapshot.data() as T, { id: snapshot.id });
  } else {
    throw new ApplicationError({ error: `no document found: ${path}` });
  }
};

export const getDocumentRef = (path: string) => db.doc(path);
export const getNewDocumentRef = (collection: string) => db.collection(collection).doc();


export const createDocPath = <T extends {}>(path: string, data: Partial<T>) => {
  return db.collection(path).add(data);
};

export const updateDoc = async <T extends {}>(
  path: string,
  data: Partial<T>,
  override: boolean
) => {
  const snapshot = await db.doc(path).get();
  if (!snapshot.exists && !override) return Promise.resolve();
  return snapshot.ref.set({ ...snapshot.data(), ...data }, { merge: override });
};

export const getAuthUser = async (userId: string) => {
  return auth().getUser(userId);
};
