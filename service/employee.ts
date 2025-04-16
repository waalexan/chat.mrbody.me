import { database } from '../config/firebase';
import { employeeProp } from '../app/types/interfaces'

export const saveEmployeepData = async (data: employeeProp) => {
  try {
    const userRef = database.ref('employees/' + data.name);
    await userRef.set({
        photo: data.photo,
        name:  data.name,
        email: data.email,
        phone: data.phone,
        BI: data.BI,
        address:  data.address,
        fatherName:  data.fatherName,
        matherName:  data.matherName,
        altura: data.altura,
        bron: data.bron,
        BI_epired: data.BI_epired,
        stade: data.stade,
        cargo: data.cargo,
        Start: data.Start,
        job: data.job,
        AgenteNumber: data.AgenteNumber,
    });
    console.log('Dados do usuário salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados do usuário:', error);
  }
};
