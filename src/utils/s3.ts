import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3Client = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export function s3uploadFile() {}

export function s3downloadFile(path: string, key: string) {
  debugger;
  const downloadParams = {
    Bucket: `${bucketName}/${path}`,
    Key: key,
  };

  return s3Client.getObject(downloadParams).createReadStream();
}
