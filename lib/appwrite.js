import { Client,Account,ID, Avatars, Databases, Query ,Storage} from 'react-native-appwrite';


export default config = {
    endpoint:"https://cloud.appwrite.io/v1",
    Platform:"com.musavir.rn",
    projectId:"6687c946003183709bbc",
    databaseId:"6687cbda001f33a44e43",
    userCollectionId:"6687cc090030f8f24c96",
    videoCollectionId:"6687cc420038cb99a737",
    storageId:"6687ce2c000f22b41cdb"
}

const {
    endpoint,
    Platform,
    projectId,
    databaseId,
    userCollectionId,videoCollectionId,
    storageId
} = config

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.Platform) 
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)
export const createUser = async (email,password,username) =>{
 try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )
    if(!newAccount) throw Error;
    
    const avatarURL = avatars.getInitials(username)
await signIn(email,password);
const newUser = await databases.createDocument(
    config.databaseId,
    config.userCollectionId,
    ID.unique(),
    {
        accountId: newAccount.$id,
        email,
        username,
        avatar:avatarURL
    }
)
return newUser
} catch (error) {
    console.log(error);
    throw new Error(error)
 }
}

export const signIn = async (email,password) => {
    try {
        const session = await account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}


export const getCurrentUser = async () =>{

    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        if(!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllposts = async () => {
    try {
        const posts = await databases.listDocuments(
databaseId,videoCollectionId,[Query.orderDesc('$createdAt')]
        )
        return  posts.documents
       
    } catch (error) {
        throw new Error(error)
    }
}

export const getTrending = async () => {
    try {
        const posts = await databases.listDocuments(
databaseId,videoCollectionId,
[Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return  posts.documents
       
    } catch (error) {
        throw new Error(error)
    }
}

export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.equal("users", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset =   {name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
};
  console.log("file----",file)
    try {
      const uploadedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        asset
      );
      console.log("uploadFile----", uploadFile);
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(config.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          config.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Video Post
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        config.databaseId,
        config.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          users: form.userId,
        }
      );
  
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  