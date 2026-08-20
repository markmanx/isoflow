import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Quill, { QuillOptions } from 'quill';
import 'quill/dist/quill.snow.css';

export interface QuillEditorProps {
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  theme?: string;
  modules?: QuillOptions['modules'];
  formats?: string[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ReactQuill: React.FC<QuillEditorProps> = ({
  value = '',
  readOnly = false,
  onChange,
  onBlur,
  theme = 'snow',
  modules,
  formats,
  placeholder,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);
  const lastEmittedValueRef = useRef<string | null>(null);
  const shouldRestoreFocusRef = useRef(false);
  const initialOptionsRef = useRef({
    value,
    readOnly,
    theme,
    modules,
    formats,
    placeholder
  });

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);

  useLayoutEffect(() => {
    const quill = quillRef.current;
    if (!quill || !shouldRestoreFocusRef.current) return;

    shouldRestoreFocusRef.current = false;
    quill.focus();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialOptions = initialOptionsRef.current;
    const editorDiv = document.createElement('div');
    container.appendChild(editorDiv);

    const quill = new Quill(editorDiv, {
      theme: initialOptions.theme,
      readOnly: initialOptions.readOnly,
      placeholder: initialOptions.placeholder,
      modules: initialOptions.modules ?? undefined,
      formats: initialOptions.formats ?? undefined
    });

    quillRef.current = quill;

    if (initialOptions.value) {
      quill.clipboard.dangerouslyPasteHTML(initialOptions.value, 'silent');
    }

    quill.on('text-change', (_delta, _oldDelta, source) => {
      if (source !== 'user' || !onChangeRef.current) return;

      const html = quill.getSemanticHTML?.() ?? quill.root.innerHTML;
      const normalizedHtml = html === '<p><br></p>' ? '' : html;
      lastEmittedValueRef.current = normalizedHtml;
      shouldRestoreFocusRef.current = true;
      onChangeRef.current(normalizedHtml);
    });

    const handleBlur = () => {
      onBlurRef.current?.();
    };
    quill.root.addEventListener('blur', handleBlur);

    return () => {
      quill.root.removeEventListener('blur', handleBlur);
      quillRef.current = null;
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill || value === lastEmittedValueRef.current) return;

    const currentHtml = quill.getSemanticHTML?.() ?? quill.root.innerHTML;
    const normalizedCurrent = currentHtml === '<p><br></p>' ? '' : currentHtml;

    if (value !== normalizedCurrent) {
      const selection = quill.getSelection();
      const hasFocus = quill.hasFocus();
      quill.clipboard.dangerouslyPasteHTML(value || '', 'silent');
      if (selection) {
        quill.setSelection(selection, 'silent');
      }
      if (hasFocus) {
        quill.focus();
      }
    }
  }, [value]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!readOnly);
    }
  }, [readOnly]);

  return <div ref={containerRef} className={className} style={style} />;
};

export default ReactQuill;
