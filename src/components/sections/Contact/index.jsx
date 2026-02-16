import React from 'react';
import Button from '@common/Button';
import { Mail, MessageSquare, Send } from 'lucide-react';
import * as S from './styles';

const Contact = () => {
  return (
    <S.Section>
      <S.GradientLeft />
      <S.GradientRight />

      <S.Container>
        <S.FormWrapper
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.Header>
            <S.Title>Ready to Scale?</S.Title>
            <S.StartDescription>
              Let's discuss how we can transform your ideas into reality.
            </S.StartDescription>
          </S.Header>

          <S.Form onSubmit={(e) => e.preventDefault()}>
            <S.Grid>
              <div>
                <S.Label>Name</S.Label>
                <S.Input type="text" placeholder="John Doe" />
              </div>
              <div>
                <S.Label>Email</S.Label>
                <S.Input type="email" placeholder="john@example.com" />
              </div>
            </S.Grid>
            <div>
              <S.Label>Message</S.Label>
              <S.TextArea rows="4" placeholder="Tell us about your project..." />
            </div>
            <S.SubmitWrapper>
              <S.SubmitButton variant="primary">
                Send Message <Send size={18} />
              </S.SubmitButton>
            </S.SubmitWrapper>
          </S.Form>
        </S.FormWrapper>

        <S.ContactInfo>
          <S.InfoItem>
            <Mail size={20} />
            <span>hello@nexus.dev</span>
          </S.InfoItem>
          <S.InfoItem>
            <MessageSquare size={20} />
            <span>Live Chat</span>
          </S.InfoItem>
        </S.ContactInfo>
      </S.Container>
    </S.Section>
  );
};

export default Contact;
