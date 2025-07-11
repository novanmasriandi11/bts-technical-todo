import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";

interface LoginFromValues {
   username: string;
   password: string;
}

const validationSchema = Yup.object().shape({
   username: Yup.string().required("Username is required"),
   password: Yup.string().required("Password is required"),
})

export default function Login() {
   const { login } = useAuth();
   const navigate = useNavigate();

   const initialValues: LoginFromValues = {
      username: "",
      password: "",
   };

   const handleSubmit = async (
      values: LoginFromValues,
      actions: FormikHelpers<LoginFromValues>
   ) => {
      actions.setStatus(undefined);
      try {
         await login(values);
         navigate("/notes", { replace: true });
      } catch (error: unknown) {
         const message = error instanceof Error ? error.message : "An unexpected error occurred";
         actions.setStatus(message);
      } finally {
         actions.setSubmitting(false);
      }
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
         <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-gray-700 dark:border dark:border-gray-700 dark:text-gray-200">
            <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>

            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, status }) => (
                  <Form className="space-y-4">
                     {status && (
                        <div className="rounded border border-red-500 bg-red-100 p-2 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
                           {status}
                        </div>
                     )}

                     <div>
                        <Field
                           name="username"
                           type="text"
                           placeholder="username"
                           className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <ErrorMessage
                           name="email"
                           component="div"
                           className="mt-1 text-sm text-red-600 dark:text-red-300 dark:border-red-600"
                        />
                     </div>

                     <div>
                        <Field
                           name="password"
                           type="password"
                           placeholder="Password"
                           className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <ErrorMessage
                           name="password"
                           component="div"
                           className="mt-1 text-sm text-red-600"
                        />
                     </div>

                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                     >
                        {isSubmitting ? 'Logged in...' : 'Login'}
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   )
}