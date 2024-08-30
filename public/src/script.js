import emailjs from '@emailjs/browser';
import toastr from 'toastr';

const formCalculate = document.getElementById('formCalculate');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const allContainer = document.getElementById('allContainer');
const infoButton = document.getElementById('infoButton');

formCalculate.addEventListener('submit', (e) => {
    e.preventDefault();
    if(checkInputLength() === true) return;
    modalOverlay.classList.remove('hidden');

    setTimeout(() => {
        modalOverlay.classList.add('open-transition');
        modalContent.classList.add('scale-transition');
    }, 10);//untuk triger animasi
    const rumusLuas = document.querySelector('#rumusLuas');
    const rumusKeliling = document.querySelector('#rumusKeliling');

    rumusLuas.textContent = rumusLuasBangunDatar();
    rumusKeliling.textContent = rumusKelilingBangunDatar();

    const input1 = document.querySelector('#input1');
    const input2 = document.querySelector('#input2');
    const input3 = document.querySelector('#input3');
    const input4 = document.querySelector('#input4');
    const input5 = document.querySelector('#input5');
    
    const resultKeliling = document.querySelector('#resultKeliling');
    const resultLuas = document.querySelector('#resultLuas');

    resultKeliling.textContent = `=  ${calculateKelilingBangunDatar()}`;
    resultLuas.textContent = `= ${calculateLuasBangunDatar()}`;
    
    updateResultContent();
    input1.value = ''; 
    input2.value = '';
    input3.value = '';
    input4.value = '';
    input5.value = '';
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('open-transition');
    modalContent.classList.remove('scale-transition');

    setTimeout(() => {
        modalOverlay.classList.add('hidden');
    }, 250);  // Waktu untuk durasi animasi selesai
});

allContainer.addEventListener('click', (e) => {
    if (e.target === allContainer) {
        modalOverlay.classList.remove('open-transition');
        modalContent.classList.remove('scale-transition');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
        }, 250);  // Waktu untuk durasi animasi selesai
    }
});

//  Klik Hamburger Menu
const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", function(){
    hamburger.classList.toggle("hamburger-active");
    const nav = document.querySelector("#nav-menu");
    nav.classList.toggle("hidden");
})
//  Navbar Fixed Scroll
function updateAnchorNav() {
    const header = document.querySelector("header");
    const anchorNav = document.querySelectorAll(".anchor-nav");
    const fixNav = header.offsetTop;
    if (window.scrollY > fixNav) {
        header.classList.add("navbar-fixed");
        
        anchorNav.forEach(element => {
            if (window.innerWidth >= 768) {
                element.classList.remove("group-hover:text-primary");
                element.classList.add("group-hover:text-white");
            } else {
                element.classList.remove("group-hover:text-white");
                element.classList.add("group-hover:text-primary");
            }
        });
    } else {
        header.classList.remove("navbar-fixed");
        
        anchorNav.forEach(element => {
            element.classList.remove("group-hover:text-white");
            element.classList.add("group-hover:text-primary");
        });
    }
}
window.onscroll = updateAnchorNav;

window.onresize = updateAnchorNav;

updateAnchorNav();

document.querySelector("#bangunDatar").addEventListener('change', function() {
    const choose = this.value;
    const pathBangunDatar = '../../public/assets/bangun_datar/';
    const imageContainer = document.querySelector("#displayBangunDatar");
    const headerContent = document.querySelector("#headerContent");

    document.querySelector("#headerBangunDatar").textContent = choose.replace(' Body', '');

    headerContent.textContent = choose.replace(' Body', '');
    imageContainer.src = pathBangunDatar + choose + '.png';

    document.querySelector('#input4Container').style.display = 'none';
    document.querySelector('#input5Container').style.display = 'none';

    addClassBangunDatar();
    updateInputBerdasarkanBangun();
    callAboutBidang();
});

//Mengecek nama file gambar yang sedang ditampilkan
function checkBangunDatar() {
    const imageContainer = document.querySelector("#displayBangunDatar");
    let fileName = decodeURIComponent(imageContainer.src.split('/').pop());

    switch(fileName) {
        case 'Persegi Panjang Body.png':
            return 'Persegi Panjang';
        case 'Persegi Body.png':
            return 'Persegi';
        case 'Lingkaran Body.png':
            return 'Lingkaran';
        case 'Segitiga Body.png':
            return 'Segitiga';
        case 'Trapesium Body.png':
            return 'Trapesium';
        case 'Jajargenjang Body.png':
            return 'Jajargenjang';
        case 'Belah Ketupat Body.png':
            return 'Belah Ketupat';
        case 'Layang-layang Body.png':
            return 'Layang-layang';
        default:
            return 'Persegi';
    }
};

//Menambahkan class ke tag img #displayBangunDatar
function addClassBangunDatar(){
    const imageContainer = document.querySelector("#displayBangunDatar");
    
    const fileName = checkBangunDatar();
    
    imageContainer.className = '';
    switch(fileName) {
        case 'Persegi Panjang':
            imageContainer.classList.add(...('w-20 s:w-24 sm:w-28 md:w-48 l:w-56 lg:w-[278px] xl:w-80 2xl:w-96 md:-mb-10 md:-mt-16 l:-mt-24 lg:-mt-12 2xl:-mt-14 rotate-45 md:rotate-0').split(' '));
            break;
        case 'Persegi':
            imageContainer.classList.add(...('my-auto s:w-[88px] md:w-32 md:h-32 l:w-40 l:h-40 lg:w-44 lg:h-44 xl:w-56 xl:h-56 2xl:w-60 2xl:h-60 md:mt-[34px] l:mt-10 lg:mt-20 xl:mt-20 2xl:mt-16').split(' '));
            break;
        case 'Lingkaran':
            imageContainer.classList.add(...('my-auto w-20 s:w-24 md:w-32 l:w-40 lg:w-52 xl:w-60 2xl:w-64 md:mt-10 lg:mt-[60px] xl:mt-[72px] 2xl:mt-16').split(' '));
            break;
        case 'Segitiga':
            imageContainer.classList.add(...('-my-5 md:-my-0 w-20 s:w-24 sm:w-28 md:w-40 l:w-48 lg:w-60 xl:w-72 2xl:w-[296px] md:-mt-7 l:-mt-[60px] lg:-mt-3 xl:-mt-5').split(' '));
            break;
        case 'Trapesium':
            imageContainer.classList.add(...('w-24 s:w-28 sm:w-32 md:w-44 l:w-60 lg:w-72 xl:w-80 2xl:w-96 md:-mt-6 l:-mt-12 lg:-mt-2 xl:mt-0').split(' '));
            break;
        case 'Jajargenjang':
            imageContainer.classList.add(...('py-6 md:py-0 -my-8 w-28 sm:w-32 md:w-52 l:w-60 lg:w-72 xl:w-[340px] 2xl:w-[400px] md:-mt-12 l:-mt-20 lg:-mt-8 xl:-mt-6 2xl:-mt-6').split(' '));
            break;
        case 'Belah Ketupat':
            imageContainer.classList.add(...('-my-5 md:-my-0 w-16 sm:w-20 md:w-24 l:w-28 lg:w-32 xl:w-40 2xl:w-44 md:-mt-7 l:-mt-16 lg:-mt-4 xl:-mt-6').split(' '));
            break;
        case 'Layang-layang':
            imageContainer.classList.add(...('-my-5 md:-my-0 w-16 s:w-20 md:w-24 l:w-32 lg:w-40 xl:w-48 2xl:w-52 md:-mt-8 l:-mt-[60px] lg:-mt-6 xl:-mt-4 2xl:-mt-2').split(' '));
            break;
        default:
            imageContainer.classList.add(...('my-auto s:w-[88px] md:w-32 md:h-32 l:w-40 l:h-40 lg:w-44 lg:h-44 xl:w-56 xl:h-56 2xl:w-60 2xl:h-60 md:mt-[34px] l:mt-10 lg:mt-20 xl:mt-20 2xl:mt-16').split(' '));
            break;
    }
}  

const aboutBidang = {
    'Persegi Panjang': 'Persegi Panjang adalah bangun datar dua dimensi yang dibentuk oleh dua pasang sisi yang masing-masing sama panjang dan sejajar serta memiliki empat sudut siku-siku.',
    'Persegi': 'Persegi adalah bangun datar dua dimensi yang dibentuk oleh empat sisi yang sama panjang dan memiliki empat sudut siku-siku.',
    'Lingkaran': 'Lingkaran adalah bangun datar dua dimensi yang dibentuk oleh himpunan titik yang berjarak sama dari satu titik tertentu yang disebut pusat.',
    'Segitiga': 'Segitiga adalah bangun datar dua dimensi yang dibentuk oleh tiga sisi dan tiga sudut.',
    'Trapesium': 'Trapesium adalah bangun datar dua dimensi yang dibentuk oleh empat sisi yang memiliki dua sisi sejajar.',
    'Jajargenjang': 'Jajargenjang adalah bangun datar dua dimensi yang dibentuk oleh empat sisi yang masing-masing pasangan sisi sejajar dan sama panjang.',
    'Belah Ketupat': 'Belah Ketupat adalah bangun datar dua dimensi yang dibentuk oleh empat sisi yang sama panjang dan memiliki dua pasang sudut yang sama besar.',
    'Layang-layang': 'Layang-layang adalah bangun datar dua dimensi yang dibentuk oleh empat sisi yang masing-masing pasangan sisi sejajar dan sama panjang.'
};

//Mendapatkan informasi tentang bangun datar yang sedang ditampilkan
function callAboutBidang() {
    const bangunDatar = checkBangunDatar();
    const infoContent2 = document.querySelector("#infoContent2");
    const infoHeader = document.querySelector("#infoHeader");
    const infoLuas = document.querySelector("#infoLuas");
    const infoKeliling = document.querySelector("#infoKeliling");

    infoHeader.textContent = bangunDatar;
    infoContent2.textContent = aboutBidang[bangunDatar];
    infoLuas.textContent = `${rumusLuasBangunDatar()}`;
    infoKeliling.textContent = `${rumusKelilingBangunDatar()}`;
}
//Menghitung luas bangun datar
function calculateLuasBangunDatar(){
    const fileName = checkBangunDatar();

    let result = 0;   
    const input1String = document.querySelector('#input1');
    const input2String = document.querySelector('#input2');
    const input5string = document.querySelector('#input5');

    const input1 = +input1String.value;
    const input2 = +input2String.value;
    const input5 = +input5string.value
    
    const phi = Math.PI.toFixed(2);

    switch(fileName) {
        case 'Persegi Panjang':
            result = input1 * input2;
            break;
        case 'Persegi':
            result = input1 * input1;
            break;
        case 'Lingkaran':
            result = phi * Math.pow(input1, 2) ;
            break;
        case 'Segitiga':
            result = 0.5 * input1 * input2;
            break;
        case 'Trapesium':
            result = 0.5 * (input1 + input2) * input5;
            break;
        case 'Jajargenjang':
            result = input1 * input2;
            break;
        case 'Belah Ketupat':
            result = 0.5 * input1 * input2;
            break;
        case 'Layang-layang':
            result = 0.5 * input1 * input2;
            break;
        default:
            result = input1 * input1;
            break;
    };
        return parseFloat(result.toFixed(2));
};

//Menghitung keliling bangun datar
function calculateKelilingBangunDatar(){
    const fileName = checkBangunDatar();

    let result = 0
    
    const input1String = document.querySelector('#input1');
    const input2String = document.querySelector('#input2');
    const input3String = document.querySelector('#input3');
    const input4String = document.querySelector('#input4');

    const input1 = +input1String.value;
    const input2 = +input2String.value;
    const input3 = +input3String.value;
    const input4 = +input4String.value;
    
    const phi = Math.PI.toFixed(2);

    switch(fileName) {
        case 'Persegi Panjang':
            result = 2 * (input1 + input2);
            break;
        case 'Persegi':
            result = 4 * input1;
            break;
        case 'Lingkaran':
            result = 2 * phi * input1;
            break;
        case 'Segitiga':
            result = input1 + input2 + input3;
            break;
        case 'Trapesium':
            result = input1 + input2 + input3 + input4;
            break;
        case 'Jajargenjang':
            result = 2 * (input1 + input2);
            break;
        case 'Belah Ketupat':
            result = 4 * input1;
            break;
        case 'Layang-layang':
            result = 2 * (input1 + input2);
            break;
        default:
            result = 4 * input1;
            break;
    };
    return parseFloat(result.toFixed(2));
};
//Menampilkan rumus luas bangun datar
function rumusLuasBangunDatar(){
    const fileName = checkBangunDatar();

    switch(fileName) {
        case 'Persegi Panjang':
            return '= panjang x lebar';
        case 'Persegi':
            return '= sisi x sisi';
        case 'Lingkaran':
            return '= 3.14 x jari-jari^2';
        case 'Segitiga':
            return '= 0.5 x alas x tinggi';
        case 'Trapesium':
            return '= 0.5 x (sisi sejajar 1 + sisi sejajar 2) x tinggi';
        case 'Jajargenjang':
            return '= alas x tinggi';
        case 'Belah Ketupat':
            return '= 0.5 x diagonal 1 x diagonal 2';
        case 'Layang-layang':
            return '= 0.5 x diagonal 1 x diagonal 2';
        default:
            return '= sisi x sisi';
        }
}
//Menampilkan rumus keliling bangun datar
function rumusKelilingBangunDatar(){
    const fileName = checkBangunDatar();

    switch(fileName) {
        case 'Persegi Panjang':
            return '= 2 x (panjang + lebar)';
        case 'Persegi':
            return '= 4 x sisi';
        case 'Lingkaran':
            return '= 3.14 x jari-jari x 2';
        case 'Segitiga':
            return '= sisi 1 + sisi 2 + sisi 3';
        case 'Trapesium':
            return '= sisi 1 + sisi 2 + sisi 3 + sisi 4';
        case 'Jajargenjang':
            return '= 2 x (sisi 1 + sisi 2)';
        case 'Belah Ketupat':
            return '= 4 x sisi';
        case 'Layang-layang':
            return '= 2 x (sisi 1 + sisi 2)';
        default:
            return '= 4 x sisi';
        }
}
//Mengubah input & label berdasarkan bangun datar
function updateInputBerdasarkanBangun(){
    const input1 = document.querySelector('#input1');
    const input2 = document.querySelector('#input2');
    const input3 = document.querySelector('#input3');
    const input4 = document.querySelector('#input4');
    const input5 = document.querySelector('#input5');

    const input4Container = document.querySelector('#input4Container');
    const input5Container = document.querySelector('#input5Container');

    const input1Label = document.querySelector('#input1Label');
    const input2Label = document.querySelector('#input2Label');
    const input3Label = document.querySelector('#input3Label');
    const input4label = document.querySelector('#input4Label');
    const input5label = document.querySelector('#input5Label');

    input1.disabled = false;
    input2.disabled = false;
    input3.disabled = false;

    input4.removeAttribute('required');
    input5.removeAttribute('required');

    input1Label.textContent = '';
    input2Label.textContent = '';
    input3Label.textContent = '';
    input4label.textContent = '';
    input5label.textContent = '';
    
    input5Container.parentElement.classList.remove('pb-10');

    const bangunDatar = checkBangunDatar();
    switch(bangunDatar){
        case 'Persegi Panjang':
            input1Label.textContent = 'Panjang';
            input2Label.textContent = 'Lebar';
            input3.disabled = true;
            break;
        case 'Persegi':
            input1Label.textContent = 'Sisi';
            input2.disabled = true;
            input3.disabled = true;
            break;
        case 'Lingkaran':
            input1Label.textContent = 'Jari-jari';
            input2.disabled = true;
            input3.disabled = true;
            break;
        case 'Segitiga':
            input1Label.textContent = 'Alas';
            input2Label.textContent = 'Tinggi';
            input3Label.textContent = 'Sisi Miring';
            break;
        case 'Trapesium':
            input1Label.textContent = 'Sisi Sejajar 1';
            input2Label.textContent = 'Sisi Sejajar 2';
            input3Label.textContent = 'sisi 1';
            input4.setAttribute('required', '');
            input5.setAttribute('required', '');
            input5Container.parentElement.classList.add('pb-10');
            input4Container.style.display = 'block';
            input5Container.style.display ='block';
            input4label.textContent = 'sisi 2';
            input5label.textContent = 'Tinggi';
            break;
        case 'Jajargenjang':
            input1Label.textContent = 'Alas';
            input2Label.textContent = 'Tinggi';
            input3.disabled = true;
            break;
        case 'Belah Ketupat':
            input1Label.textContent = 'Diagonal 1';
            input2Label.textContent = 'Diagonal 2';
            input3.disabled = true;
            break;
        case 'Layang-layang':
            input1Label.textContent = 'Diagonal 1';
            input2Label.textContent = 'Diagonal 2';
            input3.disabled = true;
            break;
        default:
            input1Label.textContent = 'Sisi';
            input2.disabled = true;
            input3.disabled = true;
            break;
    }
}

//Mengupdate konten hasil perhitungan
function updateResultContent(){
    const border1 = document.querySelector('#border1');
    const border2 = document.querySelector('#border2');

    const content1 = document.querySelector('#content1');
    const content2 = document.querySelector('#content2');
    const content3 = document.querySelector('#content3');
    const content4 = document.querySelector('#content4');   
    const content5 = document.querySelector('#content5');

    const calculateKeliling = document.querySelector('#calculateKeliling');

    const headerContent1 = document.querySelector('#headerContent1');
    const headerContent2 = document.querySelector('#headerContent2');
    const headerContent3 = document.querySelector('#headerContent3');
    const headerContent4 = document.querySelector('#headerContent4');
    const headerContent5 = document.querySelector('#headerContent5');

    const calculateLuas = document.querySelector('#calculateLuas');

    const input1 = document.querySelector('#input1').value;
    const input2 = document.querySelector('#input2').value;
    const input3 = document.querySelector('#input3').value;
    const input4 = document.querySelector('#input4').value;
    const input5 = document.querySelector('#input5').value;

    const fileName = checkBangunDatar();

    border1.classList.replace('sm:h-[260px]','sm:h-[160px]');
    border2.classList.replace('sm:h-[260px]','sm:h-[160px]');

    headerContent4.parentElement.parentElement.classList.add('hidden');
    headerContent5.parentElement.parentElement.classList.add('hidden');

    content2.parentElement.parentElement.style.display = '';
    content3.parentElement.parentElement.style.display = '';

    switch (fileName){
        case 'Persegi Panjang':
            headerContent1.textContent = 'Panjang';
            headerContent2.textContent = 'Lebar';
            content1.textContent = input1;
            content2.textContent = input2;
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 2 x (${input1} + ${input2})`;
            calculateLuas.textContent = `= ${input1} x ${input2}`;
            break;

        case 'Persegi':
            headerContent1.textContent = 'Sisi';
            content1.textContent = input1;
            content2.parentElement.parentElement.style.display = 'none';
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 4 x ${input1}`;
            calculateLuas.textContent = `= ${input1} x ${input1}`;
            break;

        case 'Lingkaran':
            headerContent1.textContent = 'Jari-jari';
            content1.textContent = input1;
            content2.parentElement.parentElement.style.display = 'none';
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 2 x π x ${input1}`;
            calculateLuas.textContent = `= π x ${input1}^2`;
            break;

        case 'Segitiga':
            headerContent1.textContent = 'Alas';
            headerContent2.textContent = 'Tinggi';
            headerContent3.textContent = 'Sisi Miring';
            content1.textContent = input1;
            content2.textContent = input2;
            content3.textContent = input3;
            calculateKeliling.textContent = `= ${input1} + ${input2} + ${input3}`;
            calculateLuas.textContent = `= 0.5 x ${input1} x ${input2}`;
            break;

        case 'Trapesium':
            headerContent1.textContent = 'Sisi Sejajar 1';
            headerContent2.textContent = 'Sisi Sejajar 2';
            headerContent3.textContent = 'Sisi 1';
            headerContent4.parentElement.parentElement.classList.remove('hidden');
            headerContent5.parentElement.parentElement.classList.remove('hidden');
            headerContent4.textContent = 'Sisi 2';
            headerContent5.textContent = 'Tinggi';
            border1.classList.replace('sm:h-[160px]','sm:h-[260px]');
            border2.classList.replace('sm:h-[160px]','sm:h-[260px]');
            content1.textContent = input1;
            content2.textContent = input2;
            content3.textContent = input3;
            content4.textContent = input4;
            content5.textContent = input5;
            calculateKeliling.textContent = `= ${input1} + ${input2} + ${input3} + ${input4}`;
            calculateLuas.textContent = `= 0.5 x (${input1} + ${input2}) x ${input5}`;
            break;

        case 'Jajargenjang':
            headerContent1.textContent = 'Alas';
            headerContent2.textContent = 'Tinggi';
            content1.textContent = input1;
            content2.textContent = input2;
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 2 x (${input1} + ${input2})`;
            calculateLuas.textContent = `= ${input1} x ${input2}`;
            break;

        case 'Belah Ketupat':
            headerContent1.textContent = 'Diagonal 1';
            headerContent2.textContent = 'Diagonal 2';
            content1.textContent = input1;
            content2.textContent = input2;
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 4 x ${input1}`;
            calculateLuas.textContent = `= 0.5 x ${input1} x ${input2}`;
            break;

        case 'Layang-layang':
            headerContent1.textContent = 'Diagonal 1';
            headerContent2.textContent = 'Diagonal 2';
            content1.textContent = input1;
            content2.textContent = input2;
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 2 x (${input1} + ${input2})`;
            calculateLuas.textContent = `= 0.5 x ${input1} x ${input2}`;
            break;

        default:
            headerContent1.textContent = 'Sisi';
            content1.textContent = input1;
            content2.parentElement.parentElement.style.display = 'none';
            content3.parentElement.parentElement.style.display = 'none';
            calculateKeliling.textContent = `= 4 x ${input1}`;
            calculateLuas.textContent = `= ${input1} x ${input1}`;
            break;
    }
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

(function() {
    emailjs.init("wlJzSjQPAdD9oVP3G");
})();

function sendEmail(){
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    emailjs.send("service_6d1rvpj","template_kjfuxjb", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => toastr.success("Terimasih atas masukan anda!", "Berhasil"))
    .catch((e) => toastr.error(e, "Gagal mengirim pesan"));
};

document.querySelector('#contactAdmin').addEventListener('submit', function(e) {
    e.preventDefault();
    sendEmail();
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';
})

let infoActive = false;

//Perbaruan
const closeButton = document.getElementById('closeButton');
const allContainer2 = document.getElementById('allContainer2'); 
const modalOverlay2 = document.getElementById('modalOverlay2');
const infoContainer2 = document.querySelector('#infoContainer2');

infoButton.addEventListener('click', function() {
    const bangunDatar = checkBangunDatar();
    if (window.innerWidth <= 600) {
        if (infoActive) return;
    
        const infoContent2 = document.querySelector('#infoContent2');
        const infoHeader = document.querySelector('#infoHeader');
        const infoLuas = document.querySelector('#infoLuas');
        const infoKeliling = document.querySelector('#infoKeliling');

        infoActive = true;

        modalOverlay2.classList.remove('hidden');

        setTimeout(() => {
            modalOverlay2.classList.add('open-transition');
            infoContainer2.classList.add('y-transition');
        }, 100);

        infoHeader.textContent = bangunDatar;
        infoContent2.textContent = aboutBidang[bangunDatar];
        infoLuas.textContent = rumusLuasBangunDatar();
        infoKeliling.textContent = rumusKelilingBangunDatar();                 
    }else{
        if (infoActive) return;
        
        const infoContainer = document.getElementById('infoContainer');
        const infoContent = document.querySelector('#infoContent');
        
        infoActive = true;
        
        infoContainer.classList.remove('hidden');
        infoContent.textContent = aboutBidang[bangunDatar];
        setTimeout(() => {
            infoContainer.classList.add('scale-transition');
        }, 10);
        setTimeout(() => {
            infoContainer.classList.remove('scale-transition');
        }, 2800);
        setTimeout(() => {
            infoContainer.classList.add('hidden');
            infoActive = false;
        }, 3000);
    }
});
closeButton.addEventListener('click', () => {
    modalOverlay2.classList.remove('open-transition');
    infoContainer2.classList.remove('y-transition');

    setTimeout(() => {
        modalOverlay2.classList.add('hidden');
    }, 250);
    infoActive = false;
});
//Fungsinya sama seperti closeButton        
allContainer2.addEventListener('click', () => {
    modalOverlay2.classList.remove('open-transition');
    infoContainer2.classList.remove('y-transition');

    setTimeout(() => {
        modalOverlay2.classList.add('hidden');
    }, 250);
    infoActive = false;
});

function resizeInfoContent(){
    if(window.innerWidth > 601){
        if(infoActive){
            modalOverlay2.classList.add('hidden');
            modalOverlay2.classList.remove('opacity-100');    
            return infoActive = false;        
        }
    };

}
window.addEventListener('resize', resizeInfoContent);

function checkInputLength() {
    const input1 = document.querySelector('#input1').value;
    const input2 = document.querySelector('#input2').value;
    const input3 = document.querySelector('#input3').value;
    const input4 = document.querySelector('#input4').value;
    const input5 = document.querySelector('#input5').value;

   if(input1.length > 10 || input2.length > 10 || input3.length > 10 || input4.length > 10 || input5.length > 10){
        toastr.warning('Input dilarang melebihi 10 karakter!', 'Anomali');
        return true;
    }

}