import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- 더미 데이터 (상품 목록) ---
const PRODUCTS = [
  { id: 1, name: '심플 베이직 티셔츠', price: 19000, desc: '어디에나 잘 어울리는 기본 티셔츠입니다.', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400' },
  { id: 2, name: '데님 와이드 팬츠', price: 39000, desc: '편안한 핏의 트렌디한 데님 팬츠입니다.', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400' },
  { id: 3, name: '모던 캔버스 백', price: 25000, desc: '수납공간이 넉넉한 데일리 캔버스 가방입니다.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400' }
];

// --- 공통 네비게이션 바 컴포넌트 ---
function Navigation({ cartCount }) {
  return (
    <nav style={{ padding: '20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>TrendShop</Link>
      <div>
        <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#555' }}>홈</Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: '#555', fontWeight: 'bold' }}>장바구니 ({cartCount})</Link>
      </div>
    </nav>
  );
}

// --- 1. 홈 페이지 (상품 목록) ---
function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>추천 상품 목록</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
            <p style={{ color: '#888' }}>{product.price.toLocaleString()}원</p>
            <Link to={`/product/${product.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', backgroundColor: '#333', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>상세보기</Link>
          </div>
        ))}
      </div>
      <pre>
        제작보고서<br />
        1. 제미나이 3.5 Flash를 사용하여 코드를 작성했습니다<div className="br"></div>
        2. 프롬프트는<br /><br />

        간단한쇼핑몰제작<br />
        – React router 를 이용한 다중 페이지이동<br />
        – 제작보고서포함<br />
        – Git hub의 저장소에 코드를저장<br />
        – 웹호스팅플랫폼(Vercel)을사용하여배포 jsx형식으로 한 디렉토리로<br /><br />

        입니다.

      </pre>

    </div>
  );
}

// --- 2. 상품 상세 페이지 ---
function DetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) return <div style={{ padding: '20px' }}>상품을 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '4px', maxWidth: '800px', margin: '0 auto' }}>
      <img src={product.img} alt={product.name} style={{ width: '40%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      <div style={{ flex: 1, paddingLeft: '20px' }}>
        <h2>{product.name}</h2>
        <h3 style={{ color: '#e44d26', margin: '10px 0' }}>{product.price.toLocaleString()}원</h3>
        <p style={{ lineHeight: '1.6', color: '#666' }}>{product.desc}</p>
        <button onClick={() => { addToCart(product); alert('장바구니에 담겼습니다!'); }} style={{ marginTop: '20px', padding: '12px 25px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>장바구니 담기</button>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 25px', backgroundColor: '#fff', color: '#222', border: '1px solid #222', borderRadius: '4px', cursor: 'pointer' }}>목록으로</button>
      </div>
    </div>
  );
}

// --- 3. 장바구니 페이지 ---
function CartPage({ cart, setCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>내 장바구니</h2>
      {cart.length === 0 ? (
        <p style={{ marginTop: '20px', color: '#888' }}>장바구니가 비어 있습니다.</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <span>{item.name} - {item.price.toLocaleString()}원</span>
              <button onClick={() => removeItem(index)} style={{ padding: '5px 10px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            총 결제 금액: <span style={{ color: '#e44d26' }}>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 메인 App 컴포넌트 (라우터 및 상태 관리) ---
export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <BrowserRouter>
      <Navigation cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<DetailPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>

  );


}