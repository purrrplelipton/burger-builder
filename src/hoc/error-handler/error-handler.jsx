import { Modal } from "@components/ui";
import React, { useEffect, useState } from "react";

function ErrorHandler(Wrapper, instance) {
  return function (props) {
    const [error, setError] = useState(null);

    const requestInterceptor = instance.interceptors.request.use((request) => {
      setError(null);
      return request;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => setError(err)
    );

    useEffect(
      () => () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
      },
      [requestInterceptor, responseInterceptor]
    );

    return (
      <>
        {error && (
          <Modal showModal={Boolean(error)} exitModal={() => setError(null)}>
            {error.message}
          </Modal>
        )}
        <Wrapper {...props} />
      </>
    );
  };
}

export default ErrorHandler;
