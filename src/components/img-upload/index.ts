/*
 * @创建者: yujinjin9@126.com
 * @描述: img-upload 组件
 */
import ImgUpload from "./img-upload.vue";
import type ImgUploadType from "./img-upload.vue";

export * from "./img-upload.ts";

export default ImgUpload;

export { ImgUpload };

export type ImgUploadInstance = InstanceType<typeof ImgUploadType>;
