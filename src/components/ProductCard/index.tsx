import styled from '@emotion/styled';
import { NextImage } from '@/src/components/NextImage';

export const StyledProductCard = styled.a`
  display: block;
  width: 250px;
  > .image-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 128%;
  }
`;

export const ProductCard = () => {
  return (
    <StyledProductCard>
      <div className="image-wrap">
        <NextImage
          src="https://product-image.kurly.com/product/image/4e91cc5c-be7c-4341-b5cb-0d3882cd97e8.jpg"
          layout="fill"
          objectFit="cover"
          alt="상품 이미지"
          loading="eager"
        />
      </div>
      <div className="label">샛별배송</div>
      <div className="title">[KF365] 1+등급 무항생제 특란 20구</div>
      <div className="price">1구 당 판매가: 365원</div>
    </StyledProductCard>
  );
};
