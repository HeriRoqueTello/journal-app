export const fileUpload = async( file ) => {

  if( !file ) throw new Error('No hay archivos para subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dlsqr4a8l/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'journal-app');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });

    if( !resp.ok ) throw new Error('No se pudo subir la imagen')

    const cloudResponse = await resp.json();

    return cloudResponse.secure_url;

  } catch (error) {
    console.log(error)
    throw new Error( error.message )
  }

  
}