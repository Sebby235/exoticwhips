"""empty message

Revision ID: 75a87b832687
Revises: ebad43ddbd73
Create Date: 2023-08-13 21:12:24.939353

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75a87b832687'
down_revision = 'ebad43ddbd73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cars', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cost', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cars', schema=None) as batch_op:
        batch_op.drop_column('cost')

    # ### end Alembic commands ###
