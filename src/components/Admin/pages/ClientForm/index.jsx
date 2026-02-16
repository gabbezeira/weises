import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import * as S from './styles';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clients, addClient, updateClient } = useAdmin();
  const isEditMode = !!id;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'Active',
    businessSector: '',
    hasMonthlyPlan: false,
    monthlyValue: '',
    clientPanelAccess: false,
    password: '', // Only sent if creating/updating user
    contractStart: '',
    leadSource: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const client = clients.find((c) => c.id === id);
      if (client) {
        // Determine if they previously had access (backend doesn't explicitly return 'username' now, but sends 'clientPanelAccess')
        // If the backend doesn't return existing password (security), valid. We just allow setting a new one.
        setFormData((prev) => ({
          ...prev,
          ...client,
          businessSector: client.businessSector || '',
          monthlyValue: client.monthlyValue || '',
          contractStart: client.contractStart || '',
          leadSource: client.leadSource || '',
          phone: client.phone || '',
          password: '', // Reset password field on load
        }));
      }
    }
  }, [id, clients, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateClient(id, formData);
      } else {
        await addClient(formData);
      }
      navigate('/admin/clients');
    } catch (error) {
      console.error('Failed to save client:', error);
      // Ideally show a toast
    }
  };

  return (
    <S.Container>
      <S.Title>
        {isEditMode ? t('admin.clients.form.edit_title') : t('admin.clients.form.new_title')}
      </S.Title>
      <S.Form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <S.Section>
          <S.SectionTitle>{t('admin.clients.form.business_info')}</S.SectionTitle>
          <S.Grid>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.client_name')}</S.Label>
              <S.Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.company_name')}</S.Label>
              <S.Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Acme Inc."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.business_sector')}</S.Label>
              <S.Input
                name="businessSector"
                value={formData.businessSector}
                onChange={handleChange}
                placeholder="Technology, Retail, etc."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>{t('admin.clients.table.status')}</S.Label>
              <S.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">{t('admin.clients.status.active')}</option>
                <option value="Inactive">{t('admin.clients.status.inactive')}</option>
                <option value="Cancelled">{t('admin.clients.status.cancelled')}</option>
              </S.Select>
            </S.FormGroup>
          </S.Grid>
        </S.Section>

        <S.Section>
          <S.SectionTitle>{t('admin.clients.form.contact_details')}</S.SectionTitle>
          <S.Grid>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.email')}</S.Label>
              <S.Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="contact@company.com"
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.phone')}</S.Label>
              <S.Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 0 0000-0000"
              />
            </S.FormGroup>
          </S.Grid>
        </S.Section>

        <S.Section>
          <S.SectionTitle>{t('admin.clients.form.contract_metrics')}</S.SectionTitle>
          <S.Grid>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.lead_source')}</S.Label>
              <S.Select name="leadSource" value={formData.leadSource} onChange={handleChange}>
                <option value="">Select Source</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Other">Other</option>
              </S.Select>
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>{t('admin.clients.form.contract_start')}</S.Label>
              <S.Input
                type="date"
                name="contractStart"
                value={formData.contractStart}
                onChange={handleChange}
              />
            </S.FormGroup>
          </S.Grid>

          <S.Grid>
            <S.FormGroup>
              <S.Label>
                {t('admin.clients.form.monthly_plan')}
                <S.ToggleSwitch>
                  <S.ToggleInput
                    type="checkbox"
                    name="hasMonthlyPlan"
                    checked={formData.hasMonthlyPlan}
                    onChange={handleChange}
                  />
                  <S.ToggleSlider />
                </S.ToggleSwitch>
              </S.Label>
              {formData.hasMonthlyPlan && (
                <S.Input
                  type="number"
                  name="monthlyValue"
                  value={formData.monthlyValue}
                  onChange={handleChange}
                  placeholder={t('admin.clients.form.monthly_value')}
                />
              )}
            </S.FormGroup>
          </S.Grid>
        </S.Section>

        {/* Client Panel Access */}
        <S.Section>
          <S.SectionTitle>
            {t('admin.clients.form.client_panel_access')}
            <S.ToggleWrapper>
              <S.ToggleSwitch>
                <S.ToggleInput
                  type="checkbox"
                  name="clientPanelAccess"
                  checked={formData.clientPanelAccess}
                  onChange={handleChange}
                />
                <S.ToggleSlider />
              </S.ToggleSwitch>
            </S.ToggleWrapper>
          </S.SectionTitle>

          {formData.clientPanelAccess && (
            <S.Grid>
              <S.FormGroup>
                <S.Label>Login Email (Read Only)</S.Label>
                <S.Input
                  value={formData.email}
                  disabled
                  title="Uses Contact Email"
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.Label>{t('admin.clients.form.password')}</S.Label>
                <S.InputGroup>
                  <S.Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isEditMode ? 'Leave blank to keep current' : 'Password'}
                  />
                  <S.IconButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    title="Toogle Visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </S.IconButton>
                  <S.IconButton type="button" onClick={generatePassword} title="Generate Password">
                    <RefreshCw size={18} />
                  </S.IconButton>
                </S.InputGroup>
              </S.FormGroup>
            </S.Grid>
          )}
        </S.Section>

        <S.ButtonGroup>
          <S.Button type="button" onClick={() => navigate('/admin/clients')}>
            {t('admin.clients.form.cancel')}
          </S.Button>
          <S.Button type="submit" $variant="primary">
            {isEditMode ? t('admin.clients.form.update') : t('admin.clients.form.save')}
          </S.Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default ClientForm;
