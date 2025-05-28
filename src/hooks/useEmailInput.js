import { useState, useMemo } from 'react';

export const EMAIL_DOMAINS = [
  "선택",
  "gmail.com",
  "naver.com",
  "hanmail.net",
  "nate.com",
  "kakao.com",
];

const emailLocalRegex = /^[a-zA-Z0-9._-]+$/;

export default function useEmailInput() {
  const [local, setLocal] = useState('');
  const [domain, setDomain] = useState(EMAIL_DOMAINS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  // 도메인 리스트 (드롭다운에서 "선택" 제외)
  const domainList = useMemo(() => EMAIL_DOMAINS.slice(1), []);

  // 입력값 변경 시 검증
  const handleLocalChange = (e) => {
    const val = e.target.value;
    setLocal(val);
    validateLocal(val);
  };

  const validateLocal = (value) => {
    if (value === '' || emailLocalRegex.test(value)) {
      setError('');
      return true;
    } else {
      setError('올바른 이메일의 형식으로 입력해주세요.');
      return false;
    }
  };

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

  const handleDomainSelect = (d) => {
    setDomain(d);
    setDropdownOpen(false);
  };

  // 이메일 완성값 (domain이 "선택"이면 빈 문자열)
  const email = local && domain && domain !== EMAIL_DOMAINS[0]
    ? `${local}@${domain}` : '';

  // 버튼 활성화 조건 (중복 없이 한 곳에서 관리)
  const isValidEmail =
    !error &&
    !!local &&
    !!domain &&
    domain !== EMAIL_DOMAINS[0];

  return {
    local,
    domain,
    error,
    dropdownOpen,
    email,
    domainList,
    isValidEmail,
    handleLocalChange,
    handleDomainSelect,
    handleDropdownToggle,
  };
}
