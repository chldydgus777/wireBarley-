import React, { useEffect } from "react";
import styled from 'styled-components'

import { actionCreators as exchageActions } from "redux/modules/exchange";
import { useDispatch, useSelector } from "react-redux";

const ExchangeCalculation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(exchageActions.getExchageAPI());
      }, []);

    const change_money = useSelector((state) => state.exchange.exchange_money);

    console.log(change_money)

    const country = [
        {moneyunit: "KRW", countryName: "한국"},
        {moneyunit: "JPY", countryName: "일본"}, 
        {moneyunit: "PHP", countryName: "필리핀"}
    ]
    return(
        <Container>
        <div>
            <p>
                환율계산
            </p>
            <p>송금국가: 미국(USD)</p>
            <div>
                수취국가: <select>
                    {country.map((data, i) => {
                        return(
                            <option key={i} value={data.moneyunit}>{data.countryName}({data.moneyunit})</option>
                        )
                    })}
                </select>
            </div>
            <p>환율: 1111 KRW/USD</p>
            <div>
                송금액: 
                <input></input>
            </div>
        <button>submit</button>

        </div>
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