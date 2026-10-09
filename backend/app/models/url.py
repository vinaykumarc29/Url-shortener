from  datetime import datetime
from sqlalchemy import DateTime , String ,Integer ,func ,column
from sqlalchemy.orm import Mapped , mapped_column

from app.database.base import Base


class URL(Base):
    __tablename__= "urls"

    id:Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    original_url:Mapped[str] =mapped_column(
        String(2048),
        nullable=False,
    )

    short_code:Mapped[str] = mapped_column(
        String(2048),
        unique=True,
        nullable=False,
        index=True
    )

    click_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0
    )

    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )