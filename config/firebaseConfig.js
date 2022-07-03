
const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "uni-social-2",
  "private_key_id": "3b73192642f9d8a40a591085b108dced961ec23b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqH1z9VQQmpUJ1\nupBINf4LZPD9Rv2DL+jZJQFUw3+rgIG4qlxZZPkUtRdJ+BFINnzuPhL9bQ9OuF84\ndxyiG0jPxLiBZdnjGw6fBketKxMR9skv8bEbg62PDBs+MSei9UOP3EOeOpu1uJcX\nPPUEKeQYvdJiwTp0ke9vqgnSKslbhDACw++jrNVTqNHlsxBiStOI8NkIA2siHCEv\ni+XunrO5VUg3fX6DldTTBOx7ZAlFgwJoK2uRFf5jDBTWmRNV+78Cohwbi1ouvaHd\n6e+rnBHd2Q3cxYmjZQ/bDuGlyw4sPLqdJi3h03vytfNHbwMBo2GguMupcuXmhLTO\njNXNUqobAgMBAAECggEANfyU+GnJ0u+/yveFAP1tXLVQSrgEDGUgSgSVyw3tToIN\n6Inbm5zQ9JLRTK514Yo1FC/Lu/Onl24n/ZXDFuh8rz545MtrHUiBV9LY3Sndt+Yu\ni1HyR85+PfZ0EMTtlKerpJQcOzLTJhRpkjzMbmFS2s0mXiN+xu5m4vM9gZ4FX05r\nmdSF8dIRhzzASpzEzmklRoRN7CJlXI/3eez+eVD7cXiGOZkHjmjfTeP9cq51Iorv\nr5ZbYs5nbxDZHmf0gkDAP0/G5t0YaSNh+CRN5CpgxsMlIWjC6oMcLJmSrgx3kaWu\nmQtKLcTi+l1nePMTb8fB8knXRgpZW/iLbTcU5LjjLQKBgQDYX6chx1jYY2ljdb/m\n5T6lrIGnEWh+qU6Z7yxyfSwBkEV7Y1t0A4NDuB2VB/Trl9OuXfIanBwQTAnWkVy/\nbOWXFUUUx5B8BRrhMnVid/IPrMADQg5ORcKkwCXNlQCejhVSPK4705EL9XdO1SKX\n8oX9YlyKx/IXs6XYXGnTn4GbZwKBgQDJR0wAElpV1N/5MbIKmK0VFKljNPc2N3Yz\nT3VGvqbVmvC/cN/1E7DvGdEc/IQsS6wWkVEHukhXuK4bl6abMLqYHLqRzfOaHu3n\nqjb/yDhdZqmCY/D2zODV/T4IaEUufqVA8Q2vEYbccTeN5ds+MA7TuJY/Ua5n8Uay\nRw+KS9Q/LQKBgHfXyw9XhascrMOs9WRi9ub2fD1X1APLrMBwC7NCBzy6dvGXn5DL\nXUoF0US5Snuu9UzvteftLVINe6l/i9pu619aJZAT1MAMZ83xj7jBbK4n5ZYoYRoT\nY3KzBn0umVA4rDCHcY2rafwwsitUu7tjVbl5YH5xrnJYS3RiAy92emfjAoGBAIKu\nLaPmRoxvl7M9FrFWixmivo9QtiiXPcD2l9gEtGD/JcvFx0JhNIEoq+I7+LyhrOtC\nEfAIfCuoFjKH9X3Q13UnQeKkasLnzeKZWvga0K2jl+62YJ58SoXk07+1oyUayMQv\nPYkqwfqh70XLtNrdbOL9d19I8wk9V38sL+TEcttJAoGAEiDJHW6x3cBT1jzb39Ko\nBBaYyz1oushS3pPEIo/u1NIWgjx9Dgi6a8a3U+IRIMboMMDpDOnuysRoqdXFB/1z\nkOqOHzHZq701Gb8q1P/Orx40rqEAStuEl7nbx4Ll6/tVL6Edc97GkyfxAeZfZvSf\nlPhUKEDtHPWdGiH13vMUlwc=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-t2awu@uni-social-2.iam.gserviceaccount.com",
  "client_id": "104866973247080524207",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t2awu%40uni-social-2.iam.gserviceaccount.com"
}

const newAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = newAdmin;