export const errorHandler = (error: any) => {
    let response = { message: 'Internal server error' };
      if (error?.message)
        response = {
          message: error.message,
        };
      return {
        status: error?.status ?? 500,
        response,
      };
}