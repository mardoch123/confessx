import { getSession } from "next-auth/react";

export const requireAuth = async (context, adminOnly = false) => {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  
  if (adminOnly && session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session },
  };
};

export const withAuth = (gssp, adminOnly = false) => {
  return async (context) => {
    const authResult = await requireAuth(context, adminOnly);
    
    if (authResult.redirect) {
      return authResult;
    }
    
    const gsspResult = await gssp?.(context) || { props: {} };
    
    return {
      ...gsspResult,
      props: {
        ...gsspResult.props,
        ...authResult.props,
      },
    };
  };
};