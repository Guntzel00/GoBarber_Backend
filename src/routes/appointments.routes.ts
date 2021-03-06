import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentServices from '../Services/CreateAppointmentServices';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  console.log(request.user);
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentDate = parseISO(date);

  const createAppointment = new CreateAppointmentServices();

  const appointment = await createAppointment.execute({
    provider_id,
    date: appointmentDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
