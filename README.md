# 🚀 Açık Artırma Web Sitesi

[![GitHub](https://img.shields.io/badge/GitHub-Backend-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emremeralzn/back-end)
[![GitHub](https://img.shields.io/badge/GitHub-Frontend-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/emremeralzn/front-end)

> **Önemli Not:** Bu proje, backend ve frontend olmak üzere iki ana bölümden oluşmaktadır. Projeyi çalıştırmak için öncelikle backend kurulumunu tamamlamanız gerekmektedir. Backend kurulumu tamamlandıktan sonra frontend kurulumuna geçebilirsiniz.
>
> Backend kurulumu için: [Backend Repo](https://github.com/emremeralzn/back-end)

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, gerçek zamanlı açık artırma işlemlerini destekleyen tam kapsamlı bir web uygulamasıdır. SignalR ile anlık güncellemeler, JWT ile güvenli kullanıcı yönetimi, Stripe ile ödeme altyapısı ve MSSQL veritabanı üzerinde Code-First mimarisi kullanılmıştır.

> **Not:** Bu proje, detaylı bir sunum dosyası (yaklaşık 80 sayfa) ve kapsamlı bir rapor tezi içermektedir. Projenin tüm detayları ve teknik dokümantasyonu bu belgelerde yer almaktadır.

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-temel-özellikler)
- [Teknik Detaylar](#-teknik-detaylar)
- [Kurulum](#-kurulum)
- [Kullanıcı Arayüzü](#-kullanıcı-arayüzü)
- [Ödeme Sistemi](#-ödeme-sistemi)
- [Yönetici Paneli](#-yönetici-paneli)

---

## 👥 Proje Ekibi

Bu kapsamlı proje, 8 kişilik bir ekip tarafından geliştirilmiştir:

### Backend Ekibi (3 Kişi)
- Katmanlı mimari tasarımı
- API geliştirme
- Veritabanı yönetimi
- SignalR entegrasyonu
- Stripe ödeme sistemi entegrasyonu

### Frontend Ekibi (3 Kişi)
- React.js ile modern UI geliştirme
- Gerçek zamanlı teklif sistemi
- Kullanıcı deneyimi optimizasyonu
- Responsive tasarım

### Test Ekibi (2 Kişi)
- API testleri
- Kullanıcı arayüzü testleri
- Performans testleri
- Güvenlik testleri

> **Not:** Projede hem backend hem de frontend geliştirme süreçlerinde aktif rol aldım. Backend tarafında API geliştirme ve veritabanı yönetimi, frontend tarafında ise kullanıcı arayüzü geliştirme , gerçek zamanlı teklif sistemi entegrasyonu , stripe ödeme sistemi entegresi ve dashboard sayfa tasarımları ve endpoint tanımlamaları görevlerinde çalıştım.


## 🔍 Proje Hakkında

Kullanıcılar, araç, elektronik, müzik aletleri, emlak ve giyim kategorilerinde ürünler ekleyebilir ve bu ürünlere açık artırma usulüyle teklif verebilir. SignalR sayesinde teklifler anlık olarak tüm kullanıcılarla senkronize edilir. Ödeme işlemleri Stripe üzerinden güvenli bir şekilde gerçekleştirilir.

## 🚀 Kurulum

### Frontend Kurulumu

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 📦 Klasör Yapısı

```
 client-app/
├── public/                 # Statik dosyalar (favicon, vs.)
├── src/
│   ├── Admin/              # Yöneticiye özel sayfalar/bileşenler
│   ├── assets/             # Görseller ve statik varlıklar
│   ├── components/         # Genel arayüz bileşenleri
│   ├── context/            # React Context API tanımları
│   ├── emptypage/          # Boş şablon veya placeholder sayfalar
│   ├── Helpers/            # Yardımcı fonksiyonlar / araçlar
│   ├── HOC/                # Higher-Order Components
│   ├── Interfaces/         # TypeScript arayüz tanımları
│   └── services/           # API istekleri, dış servis entegrasyonları
│
├── App.jsx                 # Ana uygulama bileşeni
├── App.css                 # Global CSS stilleri
├── index.jsx               # Giriş dosyası (React DOM render)
├── index.css               # Genel stiller
├── index.html              # HTML şablonu
├── vite.config.js          # Vite yapılandırması
├── eslint.config.js        # Lint kuralları
├── package.json            # Proje bağımlılıkları ve betikler
├── package-lock.json       # Sabitlenmiş bağımlılıklar
├── README.md               # Proje açıklaması
└── .gitignore              # Git tarafından yok sayılan dosyalar
```

### 🎯 Temel Özellikler

| Özellik                                | Açıklama                                                              |
| -------------------------------------- | --------------------------------------------------------------------- |
| 🧑‍💼 Kullanıcı Kayıt / Giriş Sistemi  | JWT ile kimlik doğrulama ve güvenli oturum yönetimi                   |
| ⚡ Gerçek Zamanlı Teklif Güncellemeleri | SignalR ile canlı teklif artışları ve anlık bildirimler               |
| 💳 Stripe ile Ödeme Entegrasyonu       | Kullanıcıların güvenli ödeme yapabilmesi için Stripe API entegrasyonu |
| 🧾 Ürün Listeleme ve Filtreleme        | Kategori bazlı arama ve ürün listeleme özellikleri                    |
| 📦 Code-First Entity Framework (MSSQL) | MSSQL ve EF Core ile modern veri modellemesi                          |
| 🧑‍💻 Yönetici Paneli (Admin Panel)    | Ürün ve kullanıcı yönetimi için özel yönetim ekranları                |

## 🛠️ Teknik Detaylar

### Frontend Teknolojileri

- **React.js + Vite**: Modern ve hızlı geliştirme ortamı
- **React Router**: Sayfa yönlendirme ve navigasyon
- **React Icons**: Zengin ikon kütüphanesi
- **React Context API**: Durum yönetimi
- **Axios**: HTTP istekleri
- **React Toastify**: Bildirim sistemi
- **Styled Components**: CSS-in-JS çözümü

### Backend Teknolojileri

- **ASP.NET Core 8**: API ve iş mantığı katmanı
- **SignalR**: Gerçek zamanlı iletişim
- **JWT**: Kimlik doğrulama
- **Entity Framework Core**: Veritabanı işlemleri
- **Stripe API**: Ödeme işlemleri
- **Swagger**: API dokümantasyonu

## 💻 Kullanıcı Arayüzü

### Ana Sayfa ve Kategoriler
![Ana Sayfa](https://i.imgur.com/jtp9skl.png)
![Kategoriler](https://i.imgur.com/x9ENO9J.png)

### Kullanıcı İşlemleri
![Login Sayfası](https://i.imgur.com/1t1wbDk.png)

### Ürün Detay Sayfaları
![Vehicle Sayfası 1](https://i.imgur.com/KmkJNAw.png)
![Vehicle Sayfası 2](https://i.imgur.com/mzt2hCq.png)

### Ödeme ve Teklif Süreci
<img src="https://i.imgur.com/27QmTKK.png" width="400" />
<img src="https://i.imgur.com/c2JbdMb.png" width="400" />

### Yönetim Panelleri
![Admin Panel](https://i.imgur.com/V9LpXBi.png)
![Satıcı Panel](https://i.imgur.com/xslyRmY.png)

### Uyarı/Bildirim Mesajı (React-Toastify)
<img src="https://i.imgur.com/dki0RfE.png" width="400" />

### Proje Commit Süreci
<img src="https://i.imgur.com/pL9Rllm.png" width="400" />


## 💳 Ödeme Sistemi

Proje, üç aşamalı bir ödeme ve teklif sürecine sahiptir:

1. **Ön Ödeme Hazırlık**
   - Kullanıcı bilgileri (isim, e-posta, telefon)
   - Form validasyonları
   - Ödeme öncesi onay

2. **Stripe Ödeme**
   - Güvenli ödeme altyapısı
   - Kredi kartı işlemleri
   - Ödeme onayı
  
3. **Teklif Verme**
   - Ödeme sonrası teklif butonu aktifleşir
   - Gerçek zamanlı teklif güncellemeleri
   - SignalR ile anlık bildirimler
> ### SignalR Testi
> - İki farklı tarayıcı sekmesinde aynı ürün detay sayfasını açın
> - Bir sekmeden teklif verin
> - Diğer sekmede anlık güncellemeyi gözlemleyin

## ⚡ Gerçek Zamanlı İletişim

SignalR kullanılarak gerçekleştirilen özellikler:

- Anlık teklif güncellemeleri
- Canlı fiyat değişimleri
- Kullanıcı bildirimleri
- Oturum yönetimi

## 🧑‍💻 Yönetici Paneli

### Admin Panel Özellikleri

- **Ürün Yönetimi**
  - Tüm ürünleri görüntüleme
  - Ürün düzenleme
  - Ürün silme

- **Sistem Ayarları**
  - Ödeme ayarları

### Satıcı (Seller) Panel Özellikleri
- **Ürün Yönetimi**
  - Yeni ürün ekleme
  - Mevcut ürünleri düzenleme
  - Ürün silme

- **Teklif Takibi**
  - Aktif teklifleri görüntüleme
  - Teklif geçmişi
  - Kazanan teklifleri görüntüleme
 
---

## 📬 İletişim

Benimle her zaman iletişime geçebilirsiniz:

[![Web Sitem](https://img.shields.io/badge/Web%20Site-1976d2?style=for-the-badge&logo=google-chrome&logoColor=white)](https://emremeralzn.github.io/myblog/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emre-meralsm/)

---

> Proje, modern web standartlarına uygun olarak geliştirilmiştir.  
> Hem güvenli hem de kullanıcı dostu bir açık artırma deneyimi sunar.

