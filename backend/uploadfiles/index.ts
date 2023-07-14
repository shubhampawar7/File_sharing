import { Router } from 'express';
import { getUsers, addUser, updateUser, deleteUser, loginUser, getClients, inviteUser, checkResetPasswordToken } from '../controllers/v1/users';

import { updateClients, getUserByID, getClientsByUserID, forgotPassword, resetPassword, changePassword } from '../controllers/v1/users';
import { verifyToken } from './../middleware/auth';
import { validateCreateUser, validateloginUser } from './../helper/validators/userValidator';
const router: Router = Router();

router.get('/users', verifyToken, getUsers);
router.get('/user/:id', verifyToken, getUserByID);

router.post('/user', addUser);

router.put('/user/:id', verifyToken, updateUser);
router.put('/inviteUser/:id',verifyToken,inviteUser);

router.delete('/user/:id', verifyToken, deleteUser);

router.post('/login', validateloginUser, loginUser);

router.get('/clients', verifyToken, getClients);

router.put('/clients', verifyToken, updateClients);

router.get('/clients/:id', verifyToken, getClientsByUserID);

router.post('/forgotpassword', forgotPassword);

router.post('/checkResetPasswordToken',checkResetPasswordToken)

router.post('/resetpassword', resetPassword);

router.post('/changepassword', verifyToken, changePassword);

export default router;
