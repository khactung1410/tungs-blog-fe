import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import background1 from '../../images/Screenshot 2024-08-20 at 03.28.02.png';
import background2 from '../../images/Screenshot 2024-08-20 at 03.28.36.png';
import background3 from '../../images/Screenshot 2024-08-20 at 03.28.21.png';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const HeroSection = styled.section`
  background: white;
  color: black;
  text-align: center;
  padding: 100px 0;
  z-index: 1;
`;

const Section = styled.section`
  padding: 50px 0;
  flex: 1;
  z-index: 1;
`;

const FeatureCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 1;
`;

const FeatureCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const CallToActionButton = styled(Button as any)`
  background-color: #28a745;
  border: none;
  &:hover {
    background-color: #218838;
  }
`;

const LandingPage: React.FC = () => {
  return (
    <PageWrapper>
      <HeroSection>
        <Container>
          <h1>Welcome to Mr.Tung English</h1>
          <p>House No. 116, Duong Xa Street, Thieu Duong Ward, Thanh Hoa City</p>
          <CallToActionButton size="lg">Join Us Now</CallToActionButton>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <Row>
            <Col md={4}>
              <FeatureCard>
                <FeatureCardImage src={background1} alt="Feature 1" />
                <h3>Interactive Lessons</h3>
                <p>Engage your child with fun and interactive English lessons.</p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard>
                <FeatureCardImage src={background2} alt="Feature 2" />
                <h3>Experienced Teachers</h3>
                <p>Learn from our team of experienced and friendly teachers.</p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard>
                <FeatureCardImage src={background3} alt="Feature 3" />
                <h3>Fun Activities</h3>
                <p>Enjoy a variety of fun activities and games to reinforce learning.</p>
              </FeatureCard>
            </Col>
          </Row>
        </Container>
      </Section>

        <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', textAlign: 'center', zIndex: 1 }}>
            <Container>
                <p>&copy; 2024 Mr.Tung English. All rights reserved.</p>
            </Container>
        </footer>
    </PageWrapper>
  );
};

export default LandingPage;
