/**
 * Uploads selected files from the user's device.
 * @returns An object containing the uploaded files and their corresponding file handles.
 * @throws If there is an error during the file upload process.
 */
export async function uploadFile() {
  async function showFilePicker() {
    if (!window.showOpenFilePicker) throw new Error("showOpenFilePicker is not defined");
    return await window.showOpenFilePicker({
      multiple: true,
      types: [
        {
          description: "audio files",
          accept: {
            "audio/*": [".mp3", ".wav", ".ogg"],
          },
        },
      ],
    });
  }
  try {
    const fileHandles: FileSystemFileHandle[] = await showFilePicker();
    const files: File[] = await Promise.all(
      fileHandles.map(async fileHandle => {
        return await fileHandle.getFile();
      })
    );
    return { files, fileHandles };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
