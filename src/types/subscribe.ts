export interface ModalContent {
  header: string;
  message: string;
}

// export interface SubscribeFormProps {
//   // تم تركه فارغاً حالياً لإضافة أي props مستقبلية
// }

export interface SubscribeResponse {
  data: {
    email: string;
  };
  error?: {
    message: string;
  };
}
