import type { ErrorResponse, ResponseError } from '../../models';
import type { AxiosError } from 'axios';

const hasErrors = (
  error: unknown
): error is Required<AxiosError<ErrorResponse>> => {
  const axiosError = <Partial<AxiosError>>error;
  const errorResponse = <Partial<ErrorResponse>>axiosError?.response?.data;

  return (
    !errorResponse?.success &&
    !!errorResponse?.hasErrors &&
    Array.isArray(errorResponse?.errors)
  );
};

const getErrors = (error: unknown): ResponseError[] => {
  if (hasErrors(error)) {
    return error.response.data.errors;
  }

  return [
    {
      key: 'unknown',
      message: 'Something went wrong...',
    },
  ];
};

const getError = (error: unknown): ResponseError => getErrors(error)[0];

export { getError, getErrors };