import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './assets/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ThemeButton = styled.button`
  position: 'fixed';
  bottom: 40;
  right: 40;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  background-color: ${prop=>prop.theme.accentColor};
  color: white;
  border: 0;
  &:hover{
    background-color: #74bd32;
  }
`

const Main = () => {
  // 테마 상태를 관리하는 state 추가
  const [isLightTheme, setIsLightTheme] = useState(true);
  const currentTheme = isLightTheme ? lightTheme : darkTheme;

  // 테마를 토글하는 함수
  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <App />
        <ThemeButton style={{position: 'fixed', bottom: 40, right: 40,}} onClick={toggleTheme}>
          {isLightTheme ? 'Dark' : 'Light'}
        </ThemeButton>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
