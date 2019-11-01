import SparkMD5 from 'spark-md5'
export function checkIsUploaded(form) {
  return axios({
    url: '/api/hgz/upload/check',
    method: 'post',
    params: form
  })
}
export function comUploadFile(file, config) {
  const configEvent = {
    onProgress(total, loaded) {
      let percent = Math.floor(loaded / total * 100);
      if (percent > 100) {
        percent = 100;
      }
      config.onProgress && config.onProgress(total, loaded, percent);
    },
    onFailed(e) {
      config.onFailed && config.onFailed(e);
    },
    onSuccess(data) {
      config.onSuccess && config.onSuccess(data);
    }
  };
  calculateMd5(file, md5 => {
    // 存储文件的md5码
    const form = {
      md5,
      name: file.name
    };
    checkIsUploaded(form).then(res => {
      if (!res.success) { // 不存在，上传文件
        doUplaod(md5, file, configEvent);
      } else { // 如果服务器删已经存在，则秒传
        configEvent.onSuccess && configEvent.onSuccess(res);
      }
    }).catch(error => {
      configEvent.onFailed && configEvent.onFailed(error);
    });
  });
}
export function calculateMd5(file, callback) {
  let fileReader = new FileReader(),
    blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
    chunkSize = 2097152,
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    spark = new SparkMD5();

  fileReader.onload = function(e) {
    spark.appendBinary(e.target.result); // append binary string
    currentChunk++;

    if (currentChunk < chunks) {
      loadNext();
    } else {
      callback && callback(spark.end());
    }
  };

  function loadNext() {
    let start = currentChunk * chunkSize,
      end = start + chunkSize >= file.size ? file.size : start + chunkSize;

    fileReader.readAsBinaryString(blobSlice.call(file, start, end));
  }

  loadNext();
}
// 开始上传文件
export function doUplaod(md5, file, configEvent) {
  const form = new FormData();
  form.append('file', file)
  form.append('md5', md5)
  form.append('name', file.name);

  axios({
    url: '/api/hgz/upload/md5',
    method: 'post',
    data: form,
    onUploadProgress(evt) { // 原生获取上传进度的事件
      if (evt.lengthComputable) {
        // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        configEvent.onProgress && configEvent.onProgress(evt.total, evt.loaded);
      }
    }
  }).then(res => {
    configEvent.onSuccess && configEvent.onSuccess(res);
  }).catch(error => {
  	console.log(error)
    configEvent.onFailed && configEvent.onFailed(error);
  });
}
