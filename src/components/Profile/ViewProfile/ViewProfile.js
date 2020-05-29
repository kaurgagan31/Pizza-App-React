import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AuthContext } from '../../../context/auth-context';
import * as Yup from 'yup';

const ViewProfile = () => {
    const authContext = useContext(AuthContext);     
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
       
    };
        const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    });
        function onSubmit(fields, { setStatus, setSubmitting }) {

    }
    const [user, setUser] = useState({});
    // useEffect(() => {
    //     const userData = authContext.currentUser;
    //     console.log(userData);
    //             const fields = ['firstName', 'lastName', 'email',];
    //             fields.forEach(field => setFieldValue(field, user[field], false));
    //             setUser(user);
        
    // }, []);
return (
           <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
      

                return (
                    <Form>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-7">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                        
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to='/' className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
);
}

export default ViewProfile;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';


// const AddEdit = ({ history, match }) => {
//     const { id } = match.params;
//     const isAddMode = !id;
    
//     const initialValues = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         role: '',
//         password: '',
//         confirmPassword: ''
//     };

//     const validationSchema = Yup.object().shape({
//         firstName: Yup.string()
//             .required('First Name is required'),
//         lastName: Yup.string()
//             .required('Last Name is required'),
//         email: Yup.string()
//             .email('Email is invalid')
//             .required('Email is required')
//     });

//     function onSubmit(fields, { setStatus, setSubmitting }) {
//         setStatus();

//     }


//     return (
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//             {({ errors, touched, isSubmitting, setFieldValue }) => {
//                 const [user, setUser] = useState({});
//                 useEffect(() => {
//                     if (!isAddMode) {
//                         // get user and set form fields
//                         userService.getById(id).then(user => {
//                             const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
//                             fields.forEach(field => setFieldValue(field, user[field], false));
//                             setUser(user);
//                         });
//                     }
//                 }, []);

//                 return (
//                     <Form>
//                         <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
//                         <div className="form-row">
//                             <div className="form-group col">
//                                 <label>Title</label>
//                                 <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
//                                     <option value=""></option>
//                                     <option value="Mr">Mr</option>
//                                     <option value="Mrs">Mrs</option>
//                                     <option value="Miss">Miss</option>
//                                     <option value="Ms">Ms</option>
//                                 </Field>
//                                 <ErrorMessage name="title" component="div" className="invalid-feedback" />
//                             </div>
//                             <div className="form-group col-5">
//                                 <label>First Name</label>
//                                 <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
//                             </div>
//                             <div className="form-group col-5">
//                                 <label>Last Name</label>
//                                 <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group col-7">
//                                 <label>Email</label>
//                                 <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
//                                 <ErrorMessage name="email" component="div" className="invalid-feedback" />
//                             </div>
                        
//                         </div>
//                         <div className="form-group">
//                             <button type="submit" disabled={isSubmitting} className="btn btn-primary">
//                                 {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
//                                 Save
//                             </button>
//                             <Link to='/' className="btn btn-link">Cancel</Link>
//                         </div>
//                     </Form>
//                 );
//             }}
//         </Formik>
//     );
// }

// export default  AddEdit ;