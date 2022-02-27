import React, { useState, useEffect } from "react";
import styled from 'styled-components'

import { actionCreators as exchageActions } from "redux/modules/exchange";
import { useDispatch, useSelector } from "react-redux";

const ExchangeCalculation = () => {
    const [selected, setSelected] = useState('KRW');
    const [exchange, setExchange] = useState();
    const [resultMoney, setResultMoney] = useState();
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(exchageActions.getExchageAPI());
    }, [selected]);
    
    const change_money = useSelector((state) => state.exchange.exchange_money);
    
    const KR = change_money ? change_money.USDKRW : '';
    const JP = change_money ? change_money.USDJPY : '';
    const PH = change_money ? change_money.USDPHP : '';

    const selectedHandle = (e) => { 
        if(e.target.value === 'KRW'){
            setSelected(e.target.value)
            setExchange(KR);
        } else if (e.target.value === "JPY") {
            setSelected(e.target.value)
            setExchange(JP);
        } else {
            setSelected(e.target.value)
            setExchange(PH);
        }
    }
    const submitBtn = (e) => {
        e.preventDefault()
        setResultMoney(e.target.value)
        let money = e.target[1].value
        if(money >=0 && money <= 10000 ) {
            setShow(true);
        } else {
            setShow(false);
        }
    }
    const country = [
        {moneyunit: "KRW", countryName: "한국"},
        {moneyunit: "JPY", countryName: "일본"}, 
        {moneyunit: "PHP", countryName: "필리핀"}
    ]
    const Comma = (exchange*resultMoney).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const Comma_ = exchange ? (exchange).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    
    return(
        <Container>
        <form onSubmit={submitBtn}>
            <p>
                환율계산
            </p>
            <p>송금국가: 미국(USD)</p>
            <div>
                수취국가: <select onChange={selectedHandle}>
                    {country.map((data, i) => {
                        return(
                            <option key={i} value={data.moneyunit}>{data.countryName}({data.moneyunit})</option>
                        )
                    })}
                </select>
            </div>
            <p>환율: {Comma_} {selected}/USD</p>
            <div>
                송금액: 
                 <input/>
            </div>
        <button type="submit">submit</button>
        </form>
        {show ? <div> 수취금액은 {Comma} {selected} 입니다</div> : <div style={{ color: "red" }}> 송금액이 바르지 않습니다 </div>}
        </Container>
    )
};

const Container = styled.div`
display: flex;
width: 500px;
background-color: #eee;
padding: 1rem;
`;

export default ExchangeCalculation;