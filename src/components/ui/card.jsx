import React from 'react';

const cardStyles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    padding: '1.5rem',
  },
};

export const Card = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`ui-card ${className}`}
      style={cardStyles.card}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`ui-card-header ${className}`}
      style={cardStyles.header}
      {...props}
    />
  );
});

export const CardTitle = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={`ui-card-title ${className}`}
      style={cardStyles.title}
      {...props}
    />
  );
});

export const CardContent = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`ui-card-content ${className}`}
      style={cardStyles.content}
      {...props}
    />
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardContent.displayName = 'CardContent';