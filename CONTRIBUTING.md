# How to add a context
1. create a new context file, e.g. ./UserContext/UserContext.tsx
2. export the new context provider through the index.ts file
3. wrap the new context provider around the children, e.g. <UserProvider>{children}</UserProvider>
4. add the new context hook to the useAppContext hook
