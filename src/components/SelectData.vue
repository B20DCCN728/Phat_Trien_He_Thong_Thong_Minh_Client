<template>
    <a-table :columns="columns" :data-source="dataSource" bordered v-show="!loading">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <router-link :to="'/home/dataset/' + record.id"> {{ text }}</router-link>
        </template>
        <template v-if="column.dataIndex === 'quantity'">
          <p> {{ record.samples.length }} </p>
        </template>
        <template v-if="column.dataIndex === 'Start'">
            <a-button class="retrain" type="primary" @click="train(typeTrain, record.id)" danger>Start</a-button>
        </template>
      </template>
      <template #title>
        <span style="font-weight: bold; font-size: 1.2rem;">Danh sách tập dữ liệu phù hợp với {{ typeTrain }}</span>
      </template>
      <template #footer>B20DCCN728 - Nguyễn Hoàng Việt</template>
    </a-table>
    <!-- Skeleton -->
    <div class="skeleton">
        <a-skeleton :loading="loading" active class="skeleton" v-for="index in skeleton_time" :key="index">  
        </a-skeleton>
    </div>

    <div>
        <a-button type="primary" @click="showModal">Open Modal</a-button>
        <a-modal v-model:open="open" title="Kết quả thu được" @ok="handleOk">
        <p>Tên mô hình: {{ dataTrain.name }}</p>
        <p>Đường dẫn: {{ dataTrain.link }}</p>
        <p>Tên thuật toán: {{ dataTrain.modelName }}</p>
        <p>Ngày Tạo: {{ dataTrain.validDate }}</p>
        <p>Accuracy: {{ dataTrain.acc }}</p>
        <p>Precision: {{ dataTrain.pre }}</p>
        <p>Recall: {{ dataTrain.re }}</p>
        <p>F1 Score: {{ dataTrain.f1 }}</p>
        <p>Trạng thái: {{ dataTrain.isActive }}</p>
        </a-modal>
    </div>

  </template>
  <script setup>
  import { message } from 'ant-design-vue';
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';


    const open = ref(false);
    const showModal = () => {
        open.value = true;
    };

    const router = useRouter();

    const handleOk = e => {
        console.log(e);
        router.push(`/home/model`);
        open.value = false;
    };


  const loading = ref(false);
  const skeleton_time = 4;

  // Declare 
  const route = useRoute();
  const typeTrain = ref(route.params.typeTrain);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
    },
    {
      title: 'Tên tập dữ liệu',
      dataIndex: 'name',
    },
    {
      title: 'Đường dẫn',
      className: 'column-money',
      dataIndex: 'link',
    },
    {
      title: 'Số lượng mẫu',
      dataIndex: 'quantity',
    },
    {
        title: 'Select',
        dataIndex: 'Start',
    }
  ];
  const dataSource = ref([
    {
      id: '1',
      name: 'John Brown',
      link: '￥300,000.00',
      quantity: '100',
      samples: [
        {
          id: '1',
          name: 'John Brown',
          link: '￥300,000.00',
          quantity: '100',
        },
        {
          id: '1',
          name: 'John Brown',
          link: '￥300,000.00',
          quantity: '100',
        },
      ]
    },
    {
      id: '1',
      name: 'John Brown',
      link: '￥300,000.00',
      quantity: '100',
      samples: [
        {
          id: '1',
          name: 'John Brown',
          link: '￥300,000.00',
          quantity: '100',
        },
        {
          id: '1',
          name: 'John Brown',
          link: '￥300,000.00',
          quantity: '100',
        },
      ]
    },
    {
      id: '1',
      name: 'John Brown',
      link: '￥300,000.00',
      quantity: '100',
      samples: [
        {
          id: '1',
          name: 'John Brown',
          link: '￥300,000.00',
          quantity: '100',
        },
        {
          id: '1',
          name: 'John Brown',
          link: '￥300,000.00',
          quantity: '100',
        },
      ]
    },
  ]);

  const dataTrain = ref(
    {
        "name": "string",
        "link": "string",
        "validDate": "2023-11-08T02:55:36.776Z",
        "modelName": "string",
        "acc": 0,
        "pre": 0,
        "re": 0,
        "f1": 0,
        "isActive": 0
    }
  );
  
  const train = async (typeTrain, datasetId) => {
    message.success('Đã chọn tập dữ liệu');
    // Send an HTTP DELETE request to delete the record

    loading.value = true;

    axios
    .get(`http://127.0.0.1:8000/model/${typeTrain}/${datasetId}`)
    .then((response) => {
        dataTrain.value = response.data;
        loading.value = false;
        open.value = true;
    })
    .catch((error) => {
        message.error('Lỗi xóa mẫu ' + error.message);
    });

  }


  const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get-all-dataset');

            dataSource.value = response.data; 


            console.log('Data fetched:', response.data); // Add this line

        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Error fetching data');
        }
    };
    
    onMounted(() => {
        fetchData();
    })
  </script>
  <style scoped>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  </style>