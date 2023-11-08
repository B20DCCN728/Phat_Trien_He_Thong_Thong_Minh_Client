<template>
    <!-- <template> -->
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Overview"
      sub-title="Xem danh sách mẫu đã có"
      @back="() => {
        this.$router.push(`/home/dataset/${datasetId}`);
      }"
    />
    <!-- </template> -->
    <h1 
      style="
        color: rgb(235, 29, 2);

        margin: 10px 0 30px 10px;

        font-weight: 600;

        font-size: 1.5rem;
      "
      >Create new sample</h1>
    <!-- <a-checkbox :checked="componentDisabled" @change="e => (componentDisabled = e.target.checked)">
      Form disabled
    </a-checkbox> -->
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      :disabled="componentDisabled"
      style="max-width: 600px"
    >
      <a-form-item label="Hand">
        <a-input v-model:value="formData.name"/>
      </a-form-item>
      <a-form-item label="Upload">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          :headers="headers"
          @change="handleChange"
          :action="`http://127.0.0.1:8000/dataset/${datasetId}/upload`" 
          list-type="picture-card" 
        >
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="Button">
        <a-button type="primary" @click="handleSubmit">Create Sample</a-button>
      </a-form-item>
    </a-form>
  </template>
  <script setup>
  import { ref, reactive } from 'vue';
  import { message } from 'ant-design-vue';
//   const componentDisabled = ref(true);
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  // Declare 
  const route = useRoute();
  const datasetId = ref(route.params.datasetId);

  const handleChange = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
  };

  const fileList = ref([]);

  const headers = {
    authorization: 'authorization-text',
  };

  const formData = ref({
        name: 'Hand',
        file: null,
    });
  const labelCol = {
    style: {
      width: '150px',
    },
  };
  const wrapperCol = {
    span: 14,
  };
  const radioValue = ref('apple');
  const treeData = reactive([
    {
      title: 'Light',
      value: 'light',
      children: [
        {
          title: 'Bamboo',
          value: 'bamboo',
        },
      ],
    },
  ]);
  const options = reactive([
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
        },
      ],
    },
  ]);

  const uploadEndpoint = `http://127.0.0.1:8000/dataset/${datasetId.value}/create-sample`; // My API endpoint

  const handleSubmit = () => {
        // console.log(formData);
        // if (!formData.file || !formData.name) {
        //     message.error('Vui lòng điền đủ thông tin.');
        //     return;
        // }

        const formDataToSend = new FormData(); 
        formDataToSend.append('name', formData.value.name);
        formDataToSend.append('link_img', fileList.value[0].name);
        formDataToSend.append('validDate', '2023-10-29 00:43:54.000');
        formDataToSend.append('link_map', fileList.value[1].name);
        // formDataToSend.append('link_map', "");
        axios
            .post(uploadEndpoint, formDataToSend)
            .then((response) => {
                message.success('Dữ liệu đã được gửi thành công.' + JSON.stringify(response.data));
                fileList.value = [];
            })
            .catch((error) => {
              message.error('Lỗi khi gửi dữ liệu: ' + error.message);
            });
    };

  const checked = ref(false);
  </script>