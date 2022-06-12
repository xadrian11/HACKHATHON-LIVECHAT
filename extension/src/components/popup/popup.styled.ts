import styled from "styled-components"

export const PopupWrapper = styled.div<{ opinions: any }>`
    height: 400px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: ${({ opinions }) => !opinions && 'center' };
    row-gap: 1rem;
    flex-direction: ${({ opinions }) => opinions ? 'column' : 'row'};
    padding: 2rem;
    position: relative;

    p {
        display: flex;
        flex-direction: column;
        
        
    }

    code {
            word-break: break-word;
            white-space: pre;
    }
`

export const FlagWrapper = styled.div<{ selectedFlag: any }>`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: ${({ selectedFlag }) => selectedFlag === "red" ? "url('redflag.png'), #f2514e" : selectedFlag === "orange" ? "url('orangeflag.png'), #fc8d45"  : "url('greenflag.png'), #6bd595"}; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
`

export const Footer = styled.div `
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 10px;
    width: 100%;
    border-top: 1px solid rgba(0,0,0,0.2);
    padding-top: .5rem;
    padding-right: .5rem;
`

export const ArrowsWrapper = styled.div`
    width: 85%;
    height: 50px;
    display: flex;
    column-gap: 1rem;
    align-items: center;
    justify-content: center;

    & > span:first-child, & > span:last-child{
        font-size: 1.5rem;
        flex: 1;
    }

    button { 
        flex: 2;
    }
`

export const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;

    img {
        width: 100%;
        transform: translateX(50px) scale(1.3);
    }
`


