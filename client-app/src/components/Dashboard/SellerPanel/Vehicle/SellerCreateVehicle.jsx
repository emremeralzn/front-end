// SellerCreateVehicle.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SellerCreateVehicle.css';

const SellerCreateVehicle = ({ vehicle, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageToStore, setImageToStore] = useState(null);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [formData, setFormData] = useState({
    vehicleId: 0,
    brandAndModel: '',
    manufacturingYear: 0,
    color: '',
    engineCapacity: 0,
    price: 0,
    millage: 0,
    plateNumber: '',
    auctionPrice: 0,
    additionalInformation: '',
    startTime: '',
    endTime: '',
    isActive: true,
    image: '',
    sellerId: user?.nameid || '',
    bids: null
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        vehicleId: vehicle.vehicleId || 0,
        brandAndModel: vehicle.brandAndModel || '',
        manufacturingYear: vehicle.manufacturingYear || 0,
        color: vehicle.color || '',
        engineCapacity: vehicle.engineCapacity || 0,
        price: vehicle.price || 0,
        millage: vehicle.millage || 0,
        plateNumber: vehicle.plateNumber || '',
        auctionPrice: vehicle.auctionPrice || 0,
        additionalInformation: vehicle.additionalInformation || '',
        startTime: vehicle.startTime ? new Date(vehicle.startTime).toISOString().slice(0, 16) : '',
        endTime: vehicle.endTime ? new Date(vehicle.endTime).toISOString().slice(0, 16) : '',
        isActive: vehicle.isActive || true,
        image: vehicle.image || '',
        sellerId: vehicle.sellerId || user?.nameid || '',
        bids: vehicle.bids || null
      });

      // URL kontrolü ve oluşturma
      const imageUrl = vehicle.image?.startsWith('http') 
        ? vehicle.image 
        : vehicle.image 
          ? `https://localhost:7282/Images/${vehicle.image}`
          : '';
      
      setImageToDisplay(imageUrl);
    }
  }, [vehicle, user]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setError("Dosya boyutu 1MB'dan küçük olmalıdır");
        setImageToStore("");
        setImageToDisplay("");
        return;
      } else if (isImageTypeValid.length === 0) {
        setError("Dosya türü jpeg, jpg veya png olmalıdır");
        setImageToStore("");
        setImageToDisplay("");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setImageToStore(base64String);
        setImageToDisplay(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Form verilerini ekle
      formDataToSend.append("BrandAndModel", formData.brandAndModel);
      formDataToSend.append("ManufacturingYear", formData.manufacturingYear.toString());
      formDataToSend.append("Color", formData.color);
      formDataToSend.append("EngineCapacity", formData.engineCapacity.toString());
      formDataToSend.append("Price", formData.price.toString());
      formDataToSend.append("Millage", formData.millage.toString());
      formDataToSend.append("PlateNumber", formData.plateNumber);
      formDataToSend.append("AdditionalInformation", formData.additionalInformation);
      formDataToSend.append("StartTime", formData.startTime);
      formDataToSend.append("AuctionPrice", formData.auctionPrice.toString());
      formDataToSend.append("EndTime", formData.endTime);
      formDataToSend.append("IsActive", formData.isActive.toString());
      formDataToSend.append("SellerId", formData.sellerId);

      // Resim işlemleri
      if (imageToStore) {
        // Yeni seçilen resim
        formDataToSend.append("Image", imageToStore);
        
        try {
          const base64Data = imageToStore.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          
          const blob = new Blob(byteArrays, { type: 'image/jpeg' });
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          formDataToSend.append("File", file);
        } catch (error) {
          console.error('Resim dönüştürme hatası:', error);
          setError('Resim işlenirken bir hata oluştu');
          setLoading(false);
          return;
        }
      } else if (vehicle && vehicle.image) {
        // Mevcut resmi kullan
        if (vehicle.image.startsWith('data:image')) {
          // Base64 formatındaki resim
          formDataToSend.append("Image", vehicle.image);
          try {
            const base64Data = vehicle.image.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteArrays = [];
            
            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
              const slice = byteCharacters.slice(offset, offset + 1024);
              const byteNumbers = new Array(slice.length);
              
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
              
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }
            
            const blob = new Blob(byteArrays, { type: 'image/jpeg' });
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            formDataToSend.append("File", file);
          } catch (error) {
            console.error('Resim dönüştürme hatası:', error);
            setError('Resim işlenirken bir hata oluştu');
            setLoading(false);
            return;
          }
        } else {
          // URL formatındaki resim
          try {
            // Resmi doğrudan base64 olarak gönder
            formDataToSend.append("Image", vehicle.image);
            
            // Resmi File olarak da gönder
            const response = await fetch(vehicle.image, {
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            });
            
            if (!response.ok) {
              throw new Error('Resim yüklenemedi');
            }
            
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            formDataToSend.append("File", file);
          } catch (error) {
            console.error('Resim yükleme hatası:', error);
            setError('Resim yüklenirken bir hata oluştu. Lütfen resmi tekrar yükleyin.');
            setLoading(false);
            return;
          }
        }
      } else if (!vehicle) {
        // Yeni kayıt ve resim seçilmediyse
        setError("Lütfen bir resim seçin");
        setLoading(false);
        return;
      }

      // FormData içeriğini logla
      console.log('Gönderilen FormData:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      if (vehicle) {
        const response = await api.updateVehicle(vehicle.vehicleId, formDataToSend);
        if (response.isSuccess) {
          toast.success('Araç başarıyla güncellendi!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          onSuccess();
        } else {
          setError(response.error);
        }
      } else {
        const response = await api.createVehicle(formDataToSend);
        if (response.isSuccess) {
          toast.success('Araç başarıyla eklendi!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          onSuccess();
        } else {
          setError(response.error);
        }
      }
    } catch (error) {
      console.error('Hata detayı:', error);
      setError(error.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="create-vehicle-container">
      <h2>{vehicle ? 'Araç Düzenle' : 'Yeni Araç Ekle'}</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="vehicle-form" encType="multipart/form-data">
        <div className="form-grid">
          <div className="form-group">
            <label>Marka ve Model</label>
            <input
              type="text"
              name="brandAndModel"
              value={formData.brandAndModel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Üretim Yılı</label>
            <input
              type="number"
              name="manufacturingYear"
              value={formData.manufacturingYear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
          <div className="form-group">
            <label>Renk</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Motor Hacmi</label>
            <input
              type="number"
              step="0.1"
              name="engineCapacity"
              value={formData.engineCapacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fiyat</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Kilometre</label>
            <input
              type="number"
              name="millage"
              value={formData.millage}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Plaka</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Açık Artırma Fiyatı</label>
            <input
              type="number"
              name="auctionPrice"
              value={formData.auctionPrice}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group full-width">
            <label>Ek Bilgiler</label>
            <textarea
              name="additionalInformation"
              value={formData.additionalInformation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Başlangıç Tarihi ve Saati</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bitiş Tarihi ve Saati</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Durum</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
            >
              <option value={true}>Aktif</option>
              <option value={false}>Pasif</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>Araç Resmi</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!vehicle}
            />
            {imageToDisplay && (
              <img 
                src={imageToDisplay} 
                alt="Preview" 
                className="image-preview"
              />
            )}
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            İptal
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? 'Kaydediliyor...' : (vehicle ? 'Güncelle' : 'Kaydet')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerCreateVehicle;
