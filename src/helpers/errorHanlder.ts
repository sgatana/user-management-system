export const errorHandler = (error: any) => {
    let response = { error: 'Internal server error' };
      if (error?.message)
        response = {
          error: error.message,
        };
      return {
        status: error?.status ?? 500,
        response,
      };
}