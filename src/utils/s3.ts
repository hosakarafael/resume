import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_A_KEY;
const secretAccessKey = process.env.AWS_S_KEY;

const s3Client = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export function s3uploadFile() {}

export function s3downloadFile(path: string, key: string) {
  const signedUrlExpireSeconds = 60 * 5;

  const downloadParams = {
    Bucket: `${bucketName}/${path}`,
    Key: key,
  };

  return new Promise((resolve) => {
    s3Client
      .headObject(downloadParams)
      .promise()
      .then(() => {
        resolve(
          s3Client.getSignedUrl("getObject", {
            ...downloadParams,
            Expires: signedUrlExpireSeconds,
          })
        );
      })
      .catch(() => {
        resolve("/images/no-picture.jpeg");
      });
  });
}
