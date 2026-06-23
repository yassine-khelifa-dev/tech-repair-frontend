import axios from "../api/axios";
import type { RepairRequestFormData } from "../schemas/repairRequestShema";



async function createRepairRequest(data: RepairRequestFormData) {
  const formData = new FormData();

  formData.append("fullname", data.fullname);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("imei", data.imei);
  formData.append("sn", data.sn);
  formData.append("issue_description", data.issue_description);
  formData.append("device_model_id", String(data.device_model_id));

  data.option_ids.forEach((id) => {
    formData.append("option_ids[]", String(id));
  });

  data.images_device?.forEach((file) => {
    formData.append("images_device[]", file);
  });

  const response = await axios.post("/repair-request/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;

  //console.log(response.data);
}

export default createRepairRequest;