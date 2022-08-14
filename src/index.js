import 'regenerator-runtime';
import './style/style.css';
import './script/component/app-bar.js';
import './script/component/search-bar.js';
import './script/component/clock-item.js';
import './script/component/jadwal-harian.js';
import './script/component/jadwal-bulanan.js';
import Typed from 'typed.js';

// API
async function cariKotaByValue(value) {
  try {
    const response = await fetch(`https://api.myquran.com/v1/sholat/kota/cari/${value}`);
    const responseJson = await response.json();
    cariKota(responseJson);
  } catch (error) {
    console.log(error);
  }
}

async function cariIdKota(value) {
  try {
    const response = await fetch(`https://api.myquran.com/v1/sholat/kota/cari/${value}`);
    const responseJson = await response.json();
    return responseJson.data[0].id;
  } catch (error) {
    console.log(error);
  }
}

async function getJadwalHariini(id, tahun, bulan, tanggal) {
  try {
    const response = await fetch(`https://api.myquran.com/v1/sholat/jadwal/${id}/${tahun}/${bulan}/${tanggal}`);
    const responseJson = await response.json();
    if (responseJson.status === true) {
      tampilkanJadwal(responseJson.data);
      getJadwalBulanini(id, tahun, bulan);
    }
    return responseJson.message;
  } catch (error) {
    console.log(error);
  }
}

async function getJadwalBulanini(id, tahun, bulan) {
  try {
    const response = await fetch(`https://api.myquran.com/v1/sholat/jadwal/${id}/${tahun}/${bulan}`);
    const responseJson = await response.json();
    if (responseJson.status === true) {
      tampilkanJadwalBulan(responseJson.data, bulan);
    }
    return responseJson.message;
  } catch (error) {
    console.log(error);
  }
}

async function jadwal() {
  try {
    const id = await cariIdKota(inputKota.value);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    getJadwalHariini(id, year, month, day);
  } catch(rejectionReason) {
    console.log(rejectionReason);
  }
}

const cariKota = (data) => {
  const dataList = document.querySelector('datalist');
  dataList.innerHTML = '';
  if (data.status === true) {
    let i = 0;
    for (let j = 0; j < data.data.length; j += 1) {
      if (!data.data[j].lokasi.includes('KAB')) {
        const option = document.createElement('option');
        option.setAttribute('value', data.data[j].lokasi);
        dataList.appendChild(option);
        i += 1;
      }
      if (i === 15) {
        break;
      }
    }
  }
};

const inputKota = document.querySelector('#input-kota')
inputKota.addEventListener('input', function() {
  cariKotaByValue(inputKota.value);
});

const btnKota = document.querySelector('.button-carikota');
btnKota.addEventListener('click', function() {
  jadwal();
});

const tampilkanJadwal = (data) => {
  const {
    subuh, dzuhur, ashar, maghrib, isya, tanggal,
  } = data.jadwal;
  const textLokasi = document.querySelector('.lokasi');
  const textSubuh = document.querySelector('.subuh');
  const textDzuhur = document.querySelector('.dzuhur');
  const textAshar = document.querySelector('.ashar');
  const textMaghrib = document.querySelector('.maghrib');
  const textIsya = document.querySelector('.isya');

  textLokasi.innerText = `${data.lokasi} ${tanggal}`;
  textSubuh.innerText = subuh;
  textDzuhur.innerText = dzuhur;
  textAshar.innerText = ashar;
  textMaghrib.innerText = maghrib;
  textIsya.innerText = isya;
};

const tampilkanJadwalBulan = (data, bulan) => {
  const table = document.querySelector('table');
  const keteranganJadwalBulanan = document.querySelector('.keterangan');
  table.innerHTML = '';
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Tanggal</th>
        <th scope="col">Subuh</th>
        <th scope="col">Dzuhur</th>
        <th scope="col">Ashar</th>
        <th scope="col">Maghrib</th>
        <th scope="col">Isya</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  keteranganJadwalBulanan.innerText = `
    Jadwal Bulan-${bulan} di ${data.lokasi}
  `;
  for (let i = 0; i < data.jadwal.length; i += 1) {
    const {
      subuh, dzuhur, ashar, maghrib, isya, tanggal,
    } = data.jadwal[i];
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${tanggal}</td>
        <td>${subuh}</td>
        <td>${dzuhur}</td>
        <td>${ashar}</td>
        <td>${maghrib}</td>
        <td>${isya}</td>
      </tr>
    `;
  }
};

// waktu
const clock = document.querySelector('.clock');

const addZero = (waktu) => {
  if (waktu < 10) {
    return `0${waktu}`;
  }
  return waktu;
};

const displayTime = () => {
  const date = new Date();
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());
  const s = addZero(date.getSeconds());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  clock.querySelector('.time').innerText = `${h}:${m}:${s}`;
  clock.querySelector('.date').innerText = `${day}/${month}/${year}`;
};

const updateTime = () => {
  displayTime();
  setTimeout(updateTime, 1000);
};

updateTime();

const typedAppBar = {
  strings: ['Jadwal', 'Jadwal Sholat', 'Jadwal Ibadah', 'Jadwal Sembahyang'],
  startDelay: 0,
  smartBackspace: true,
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
};
const textAppBar = document.querySelector('.text-app-bar');

const typed = new Typed(textAppBar, typedAppBar);
