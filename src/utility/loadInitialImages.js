async function createFileFromUrl(url) {
  const response = await fetch(url, { mode: "no-cors" });
  const data = await response.blob();
  const metadata = { type: data.type };
  const filename = url.replace(/\?.+/, "").split("/").pop();
  return new File([data], filename, metadata);
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event?.target?.result);
    };
    reader.onerror = (event) => {
      reader.abort();
      reject(event);
    };
    reader.readAsDataURL(file);
  });
}
async function loadInitialFiles(imgUrls) {
  // console.log("slm")
  // const {initialFiles} = this.props;
  try {
    const fileObjs = await Promise.all(
      imgUrls.map(async (initialFile) => {
        let file;
        if (typeof initialFile === "string") {
          file = await createFileFromUrl(initialFile);
        } else {
          file = initialFile;
        }
        const data = await readFile(file);

        return {
          file,
          data,
        };
      })
    );
    return fileObjs;

    // this.setState((state) => ({
    //     fileObjects: [].concat(
    //         state.fileObjects,
    //         fileObjs
    //     ),
    // }), this.notifyFileChange);
  } catch (err) {
    // console.log("what");
    console.log(err);
    return [];
  }
}

async function urlToObject(images) {
  try {
    let imageFiles = [];
    for (let i = 0; i < images.length; i++) {
        console.log(images[i]);
      const response = await fetch(images[i], { mode: "no-cors" });
      // here image is url/location of image
      const blob = await response.blob();
      console.log(blob);
      const file = new File([blob], `image_${i}.jpg`, { type: blob.type });
      imageFiles.push(file);
    }
    return imageFiles;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default urlToObject;
