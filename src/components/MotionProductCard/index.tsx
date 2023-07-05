import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { NextImage } from '@/src/components/NextImage';

export const StyledProductCard = styled(motion.a)`
  display: block;
  width: 250px;
  > .image-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 128%;
  }
`;

const ease = [0.6, -0.1, 0.01, 0.99];
const fadeVariant = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

export const MotionProductCard = () => {
  return (
    <StyledProductCard initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeVariant}>
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
